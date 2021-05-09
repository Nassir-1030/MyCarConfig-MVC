const connection = require("../../config/db");

class CarConfiguration{
    constructor(id, name, options, user, car){
        this.id         = id;
        this.name       = name;
        this.options    = options;
        this.user       = user;
        this.car        = car;
    }

    static all(callback, filter){
        let sql = 'SELECT cfg.*, user.*, car.* FROM car_configuration cfg join user on user.id = cfg.user_id join car on car.id = cfg.car_id';

        if(filter){
            // https://github.com/mysqljs/mysql#escaping-query-values
            // https://stackoverflow.com/questions/17922587/node-mysql-escape-like-statement
            sql += " WHERE cfg.name like "+connection.escape('%'+filter+'%');
        }

        connection.query(
            {
                sql: sql,
                nestTables: true
            }, 
            (error, result) => {
                const configurations = [];
                if(error) callback(error, null);
                else if(result.length > 0){

                    for(const config of result){
                        const configuration = new CarConfiguration(config.cfg.id, config.cfg.name, config.cfg.options, config.user, config.car);
                        configurations.push(configuration)
                    }
                    callback(null, configurations);
                }else{
                    callback(null, configurations);
                }
            }
        );
    };

    static find(id, callback){
        connection.query(
            {   
                sql: 'SELECT cfg.*, user.*, car.* FROM car_configuration cfg join user on user.id = cfg.user_id join car on car.id = cfg.car_id WHERE cfg.ID = ?',
                nestTables: true
            },
            [id], (error, result) => {
            if(error) callback(error, null);
            else if(result.length === 1){
                result = result[0];
                result.car.categoryId = result.car.category_id;
                delete result.car.category_id;
                const configuration = new CarConfiguration(result.cfg.id, result.cfg.name, result.cfg.options, result.user, result.car);

                callback(null, configuration);
            }else{
                callback(null, null);
            }
        });
    };

    static create(newCarConfig, callback){
        const {name, options, userId, carId} = newCarConfig;

        connection.query('INSERT INTO car_configuration(name, options, user_id, car_id) VALUES(?,?,?,?)', [name, options, userId, carId], (error, result) => {
            if(error) callback(error, null);
            else{
                const created = result.affectedRows === 1;
    
                callback(error, created);
            }
        });
    };

    static update(id, updatedCarConfig, callback){
        const {name, options, userId, carId} = updatedCarConfig;

        connection.query('UPDATE car_configuration SET name = ?, options = ?, user_id = ?, car_id = ? WHERE ID = ?', [name, options, userId, carId, id], (error, result) => {
            if(error) callback(error, null);
            else{
                const updated = result.affectedRows === 1;
    
                callback(error, updated);
            }

        });
    };

    static delete(id, callback){
        connection.query('DELETE FROM car_configuration WHERE ID = ?', [id], (error, result) => {
            if(error) callback(error, null);
            else{
                const deleted = result.affectedRows === 1;
    
                callback(error, deleted);
            }

        });
    };

}

module.exports = CarConfiguration;