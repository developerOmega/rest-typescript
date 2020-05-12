"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fileds) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                return callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err);
                return;
            }
            this.conectado = true;
            console.log('Base de dato ONLINE');
        });
    }
}
exports.default = MySQL;
