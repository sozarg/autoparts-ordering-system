import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = "SELECT * FROM productos";
    return connection.query(sql);
};

const selectProductWhereId = (id) => {
    const sql = "SELECT * FROM productos WHERE productos.id = ?";
    return connection.query(sql, [id]);
};

const insertProduct = (image, name, price, type) => {
    const sql = "INSERT INTO productos (imagen, nombre, precio, tipo) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [image, name, price, type]);
};

const updateProduct = (name, image, type, price, active, id) => {
    const sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, tipo = ?, precio = ?, activo = ?
        WHERE id = ?
    `;
    return connection.query(sql, [name, image, type, price, active, id]);
};

const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    return connection.query(sql, [id]);
};

export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    deleteProduct
};
