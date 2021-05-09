const connection = require("../../config/db");

class CarCategory{

    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static all(callback){
        connection.query('SELECT * FROM car_category', (error, result) => {
            if(error) callback(error, null);
            else if(result.length > 0){
                const carCategories = [];

                for(const carCategory of result){
                    carCategories.push(new CarCategory(carCategory.id, carCategory.name));
                }

                callback(null, carCategories);
            }else{
                callback(null, null)
            }
        });
    }

    static find(id, callback){
        connection.query('SELECT * FROM car_category where ID = ?',[id], (error, result) => {
            if(error) callback(error, null);
            else if(result.length === 1){
                const carCategory = new CarCategory(result[0].id, result[0].name);

                callback(error, carCategory);
            }else{
                callback(error, null);
            }
        });
    }

    static create(newCarCategory, callback){
        const name = newCarCategory.name;
        connection.query('INSERT INTO car_category(name) VALUES (?)', [name], (error, result) => {
            if(error) callback(error, null);
            else{
                const created = result.affectedRows === 1;

                callback(error, created);
            }
        });
    }

    static update(id, updatedCarCategory, callback){
        const name = updatedCarCategory.name;
        connection.query('UPDATE car_category set name = ? where id = ?', [name, id], (error, result) => {
            if(error) callback(error, null);
            else{
                const updated = result.affectedRows === 1;
    
                callback(error, updated);
            }
        });
    }

    static delete(id, callback){
        connection.query('DELETE FROM car_category where ID = ?', [id], (error, result) => {
            if(error) callback(error, null);
            else{
                const deleted = result.affectedRows === 1;
    
                callback(error, deleted);
            }
        });
    }
}

module.exports = CarCategory;