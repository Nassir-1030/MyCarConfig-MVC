
const Car = require('./../models/carModel');
const CarConfiguration = require('../models/carConfigurationModel');

exports.index   = function(req, res){
    const search = req.query.search;

    CarConfiguration.all((error, configurations) => {
        if(error) res.status(500).send();
        else if(configurations){
            res.render('car-configurations/list.ejs', {configurations: configurations, search: search});
        }else{
            res.status(404).send();
        }
    }, search);
}
exports.new = function(req, res){
    const carConfiguration = new CarConfiguration();

    Car.all((error, cars) => {
        res.render('car-configurations/form.ejs', {carConfiguration: carConfiguration, edit: false, cars: cars});
    });

}
exports.show    = function(req, res){
    const id = req.params.id;

    CarConfiguration.find(id, (error, configuration) => {
        if(error) res.status(500).send();
        else if(configuration){
            res.render('car-configurations/show.ejs', {carConfiguration: configuration});
        }else{
            res.status(404).send();
        }
    });
}
exports.create  = function(req, res){
    const newCarConfiguration = req.body;

    newCarConfiguration.userId = req.session.userId;

    CarConfiguration.create(newCarConfiguration, (error, created) => {
        if(error) res.status(500).send();
        else if(created){
            res.redirect('/car-configurations')
        }else{
            res.status(400).send();;
        }
    });
}
exports.edit = function(req, res){

    const id = req.params.id;

    let carConfiguration;

    CarConfiguration.find(id, (error, configuration) => {
        if(error) res.status(500).send();
        else if(configuration){
            carConfiguration = configuration;
            Car.all((error, cars) => {
                console.log(carConfiguration, configuration);
                res.render('car-configurations/form.ejs', {carConfiguration: carConfiguration, edit: true, cars: cars});
            });
        }else{
            res.status(404).send();
        }
    });
}
exports.update  = function(req, res){
    const id = req.params.id,
        updatedCarConfig = req.body;

    updatedCarConfig.userId = req.session.userId;
    if(!id) res.status(400).send();
    else{
        CarConfiguration.update(id, updatedCarConfig, (error, updated) => {
            if(error) res.status(500).send();
            else if(updated){
                res.redirect('/car-configurations/'+id)
            }else{
                res.status(400).send();
            }
        });
    }
}
exports.delete  = function(req, res){
    const id = req.params.id;

    if(!id) res.status(400).send();
    else{
        CarConfiguration.delete(id, (error, deleted) => {
            if(error) res.status(500).send();
            else{
                res.redirect('/car-configurations');
            }
        });
    }
}