const db = require('../db/database');
const bcrypt = require('bcryptjs');

class UsuarioDAO {
    constructor() { }

    buscarPorUsuario(nom_usuario, callback) {
        const sql = 'SELECT * FROM users WHERE nom_usuario = ?';
        db.query(sql, [nom_usuario], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            if (results.length > 0) {
                return callback(null, results[0]);
            }
            return callback(null, null);
        });
    }

    adicionar(nom_usuario, senha, callback) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);
        const sql = 'INSERT INTO users (nom_usuario, senha) VALUES (?, ?)';
        db.query(sql, [nom_usuario, hash], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null);
        });
    }

    buscarTodos(callback) {
        const sql = 'SELECT * FROM users';
        db.query(sql, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }
}

module.exports = new UsuarioDAO();
