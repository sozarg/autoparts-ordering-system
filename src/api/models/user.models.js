import connection from "../database/db.js";

const findByCorreo = (correo) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    return connection.query(sql, [correo]);
};

const insertUser = (correo, password) => {
    const sql = "INSERT INTO usuarios (correo, password) VALUES (?, ?)";
    return connection.query(sql, [correo, password]);
};

export default {
    findByCorreo,
    insertUser
};
