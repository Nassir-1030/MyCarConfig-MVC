const router = require('express').Router();

// Import controllers here
const carController = require('../app/controllers/carController');
const authenticationController = require('../app/controllers/authenticationController');
const carConfigurationController = require('../app/controllers/carConfigurationController');
const carCategoryController = require('../app/controllers/carCategoryController');

// ROUTES
// HOME ROUTE
router.get('/', (req, res) =>{ res.redirect('/car-configurations')});

// LOGIN
router.get('/login', (req, res) => { 
    res.render('login.ejs', {error: null});
});

// AUTHENTICATION
router.post('/login', authenticationController.login)
router.post('/logout', authenticationController.logout)

// CAR ROUTES
router.get('/cars', carController.index)
router.get('/cars/new', carController.new)
router.get('/cars/:id', carController.show)
router.post('/cars', carController.create)
router.get('/cars/:id/edit', carController.edit)
router.post('/cars/:id/update', carController.update) // Because PUT is not fully supported in html forms yet
router.post('/cars/:id/delete', carController.delete) // Because DELETE is not fully supported in html forms yet

// CAR CONFIGURATIONS ROUTES
router.get('/car-configurations', carConfigurationController.index)
router.get('/car-configurations/new', carConfigurationController.new)
router.get('/car-configurations/:id', carConfigurationController.show)
router.post('/car-configurations', carConfigurationController.create)
router.get('/car-configurations/:id/edit', carConfigurationController.edit)
router.post('/car-configurations/:id/update', carConfigurationController.update) // Because PUT is not fully supported in html forms yet
router.post('/car-configurations/:id/delete', carConfigurationController.delete) // Because DELETE is not fully supported in html forms yet

// CATEGORIES ROUTES
router.get('/car-categories', carCategoryController.index)
router.get('/car-categories/new', carCategoryController.new)
router.get('/car-categories/:id', carCategoryController.show)
router.post('/car-categories', carCategoryController.create)
router.get('/car-categories/:id/edit', carCategoryController.edit)
router.post('/car-categories/:id/update', carCategoryController.update) // Because PUT is not fully supported in html forms yet
router.post('/car-categories/:id/delete', carCategoryController.delete) // Because DELETE is not fully supported in html forms yet

module.exports = router;