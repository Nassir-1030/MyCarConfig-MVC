const CarCategory = require("../models/carCategoryModel");
const Car = require("../models/carModel");

exports.index = function(req, res){
    CarCategory.all((error, carCategories) => {
        if(error) res.status(500).send();
        else if(carCategories){
            console.log(carCategories);
            res.render('car-categories/list.ejs', {carCategories: carCategories});
        }else{
            res.status(404).send();
        }
    });
}
exports.new = function(req, res){
    const carCategory = new CarCategory()
    res.render('car-categories/form.ejs', {carCategory: carCategory, edit: false});
}
exports.show = function(req, res){
    const id = req.params.id;
    CarCategory.find(id, (error, carCategory) => {
        if(error) res.status(500).send();
        else if(carCategory){
            // Find all cars for this category
            Car.findByCategory(carCategory.id, (error, categoryCars) => {
                if(categoryCars.length > 0) carCategory.cars = categoryCars;
                res.render('car-categories/show.ejs', {carCategory: carCategory});
            });
        }else{
            res.status(404).send();
        }
    });
}

exports.create = function(req, res){
    const newCarCategory = req.body;
    CarCategory.create(newCarCategory, (error, created) => {
        if(error) res.status(500).send();
        else if(created){
            res.redirect('/car-categories');
        }else{
            res.status(400).send();
        }
    });
}
exports.edit = function(req, res){
    const id = req.params.id;

    CarCategory.find(id, (error, carCategory) => {
        if(error) res.status(500).send();
        else if(carCategory){
            res.render('car-categories/form.ejs', {carCategory: carCategory, edit: true});
        }else{
            res.status(404).send();
        }
    });

}
exports.update  = function(req, res){
    const id = req.params.id,
        updatedCarCategory = req.body;

    // If there is no id or no updated carCategory, this request is invalid
    if(!id || !updatedCarCategory) res.status(400).send();
    else{
        CarCategory.update(id, updatedCarCategory, (error, updated) => {
            if(error) res.status(500).send();
            else if(updated){
                res.redirect('/car-categories/'+id);
            }else{
                res.status(404).send();
            }
        });
    }

}

exports.delete  = function(req, res){
    const id = req.params.id;

    // If there is no id or no updated carCategory, this request is invalid
    if(!id) res.status(400).send();
    else{
        CarCategory.delete(id, (error, deleted) => {
            if(error) res.status(500).send();
            else if(deleted){
                res.redirect('/car-categories');
            }else{
                res.status(404).send();
            }
        });
    }
}