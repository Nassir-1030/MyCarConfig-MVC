const Car = require('../models/carModel');
const CarCategory = require('../models/carCategoryModel');

exports.index = function(req, res){
    Car.all((error, cars) => {
        if(error){
            res.status(500).send();
        }else{
            res.render('cars/list.ejs', {cars: cars});
        }
    });
}
exports.new = function(req, res){
    const car = new Car();
    CarCategory.all((error, categories) => {
        if(error) res.status(500).send();
        else{
            res.render('cars/form.ejs', {edit: false, categories: categories, car: car});
        }
    });   
}
exports.show = function(req, res){
    const id = req.params.id;
    
    Car.find(id, (error, car) => {
        if(error){
            res.status(500).send();
        }else if(car){
            if(car.categoryId){
                CarCategory.find(car.categoryId, (error, category) => {
                    car.category = category;
                    delete car.categoryId;
                    res.render('cars/show.ejs', {car: car});
                });                
            }
        }else{
            res.status(404).send();
        }
    });
}
exports.edit = function(req, res){
    const id= req.params.id;

    Car.find(id, (error, car) => {
        if(error){
            res.status(500).send();
        }else if(car){
            if(car.categoryId){
                CarCategory.all((error, categories) => {
                    if(error) res.status(500).send();
                    else{
                        res.render('cars/form.ejs', {edit: true, categories: categories, car: car});
                    }
                });                
            }
        }else{
            res.status(404).send();
        }
    });
}
exports.create = function(req, res){
    const newCar = req.body;
    Car.create(newCar, (error, created) => {
        if(error){
            res.status(500).send();
        }else if(created){
            res.redirect('/cars');
        }else{
            res.status(400).send();
        }
    });
}

exports.update = function(req, res){
    const id = req.params.id;
    const updatedCar = req.body;

    if(!id) res.status(400).send();
    else{
        Car.update(id, updatedCar, (error, updated) => {
            if(error){
                res.status(500).send();
            }else if(updated){
                res.redirect('/cars/'+id);
            }else{
                res.status(404).send();
            }
        });
    }
}

exports.delete = function(req, res){
    const id = req.params.id;
    if(!id) res.status(400).send();
    else{
        Car.delete(id, (error, deleted) => {
            if(error){
                res.status(500).send();
            }else if(deleted){
                res.redirect('/cars');
            }else{
                res.status(404).send();
            }
        });
    }
}