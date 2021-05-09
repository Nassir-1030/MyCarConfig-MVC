const connection = require('../../config/db')

class User {
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    };

    static all(result){
        connection.query('SELECT id, name, email FROM user', (error, users) => {
            if(error){
                result(error, null);
                return;
            }else if(users){
                result(null, users);
            }
        });
    }

    static find(id, result){
        connection.query('SELECT * FROM user WHERE id = ?', [id], (error, res) => {
            if(error){
                result(err, null)
            }else if(res.length){
                result(null, res[0])
            }
            else{
                result(null, null);
            }
        })
    }

    static findByName(name, result){
        connection.query('SELECT * FROM user WHERE name = ?', [name], (error, res) => {
            if(error){
                result(err, null)
            }else if(res.length){
                result(null, res[0])
            }
            else{
                console.log('Unable to find user with name '+name);
                result(null, null);
            }
        })
    }

    static create(newUser, result){
        let {name, email, password} = newUser;
        connection.query('INSERT INTO user(name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, res) => {
            if(error) {
                result(error, null);
                return;
            }
            else if (res){
                result(null, res);
            }
        })
    }
    
    static update(updatedUser, result){
        const {id, name, email, password} = updatedUser;

        connection.query(
            {
                sql: 'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?',
                values: [name, email, password, id]
            },
            function (error, res){
                if(error)throw error;
                else{
                    result(null, res.affectedRows);
                }
        });
    }

    static delete(id, result){
        connection.query('DELETE FROM user WHERE id = ?', [id], (error, res) => {
            if(error){
                result(error, null);
            }else if(res){
                const userDeleted = result.affectedRows === 0;
                result(null, userDeleted);
            }
        });
    }

}

module.exports = User;