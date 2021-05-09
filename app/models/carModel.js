const connection = require('../../config/db');

class Car{
    constructor(id, name, category){
        this.id     = id;
        this.name   = name;
        this.category = category;
    }

    static all(callback){
        connection.query('SELECT * FROM car', (error, result) => {
            if(error) callback(error, null);
            else if(result.length > 0){
                const cars = [];
                
                for(const car of result){
                    let foundCar = new Car(car.id, car.name);
                    // set categoryId only because we dont need to explicitly load the category.
                    foundCar.categoryId = car.category_id;
                    cars.push(foundCar);
                }
                callback(error, cars);
            }else{
                callback(null, []);
            }
        });
    }

    static find(id, callback){
        connection.query('SELECT * FROM car WHERE id = ?', [id], (error, result) => {
            if(error) callback(error, null);
            else if(result.length === 1){
                const car = new Car(result[0].id, result[0].name);
                car.categoryId = result[0].category_id;

                callback(error, car);
            }else{
                callback(null, null);
            }
        });
    }

    static findByCategory(categoryId, callback){
        connection.query('SELECT * FROM car WHERE category_id = ?', [categoryId], (error, result) => {
            if(error) callback(error, null);
            else{
                const cars = [];

                for(const car of result){
                    let foundCar = new Car(car.id, car.name);
                    // set categoryId only because we dont need to explicitly load the category.
                    foundCar.categoryId = car.category_id;
                    cars.push(foundCar);
                }

                callback(error, cars);
            }
        });
    }

    static create(newCar, callback){
        const {name, categoryId} = newCar;
        connection.query('INSERT INTO car(name, category_id) VALUES(?, ?)', [name, categoryId], (error, result) => {
            if(error) callback(error, null);
            else{
                const created = result.affectedRows === 1;
    
                callback(error, created);
            }
        });
    }

    static update(id, updatedCar, callback){
        const {name, categoryId} = updatedCar;
        connection.query('UPDATE car SET name = ?, category_id = ? WHERE id = ?', [name, categoryId, id], (error, result) => {
            if(error) callback(error, null);
            else{
                const updated = result.affectedRows === 1;
    
                callback(error, updated);
            }
        });
    }

    static delete(id, callback){
        connection.query('DELETE FROM car WHERE id = ?', [id], (error, result) => {
            if(error) callback(error, null);
            else{
                const deleted = result.affectedRows === 1;
    
                callback(error, deleted);
            }
        });
    }
    
};

module.exports = Car;
