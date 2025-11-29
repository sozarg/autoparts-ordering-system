import ProductModel from "../models/product.models.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModel.selectAllProducts();

        return res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    } catch (error) {
        console.error("Error obteniendo productos", error.message);
        return res.status(500).json({ message: "Error interno al obtener productos" });
    }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await ProductModel.selectProductWhereId(id);

        if (rows.length === 0) {
            return res.status(404).json({ message: `No se encontro producto con id ${id}` });
        }

        return res.status(200).json({
            payload: rows,
            message: "Producto encontrado"
        });
    } catch (error) {
        console.error("Error obteniendo producto por id", error.message);
        return res.status(500).json({ message: "Error interno al obtener producto con id" });
    }
};

// POST /api/products
export const createProduct = async (req, res) => {
    try {
        const { image, name, price, type } = req.body;

        if (!image || !name || !price || !type) {
            return res.status(400).json({ message: "Datos invalidos, asegurate de enviar todos los campos" });
        }

        const [result] = await ProductModel.insertProduct(image, name, price, type);

        return res.status(201).json({
            message: "Producto creado con exito",
            productId: result.insertId
        });
    } catch (error) {
        console.error("Error creando producto", error.message);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// PUT /api/products
export const updateProduct = async (req, res) => {
    try {
        const { id, name, image, type, price, active } = req.body;

        if (!id || !name || !image || !type || price === undefined || active === undefined) {
            return res.status(400).json({ message: "Faltan campos requeridos" });
        }

        const [result] = await ProductModel.updateProduct(name, image, type, price, active, id);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se actualizo el producto" });
        }

        return res.status(200).json({ message: `Producto con id ${id} actualizado correctamente` });
    } catch (error) {
        console.error("Error al actualizar productos", error.message);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// DELETE /api/products/:id
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await ProductModel.deleteProduct(id);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se elimino el producto" });
        }

        return res.status(200).json({ message: `Producto con id ${id} eliminado correctamente` });
    } catch (error) {
        console.error("Error al eliminar un producto", error.message);
        return res.status(500).json({ message: `Error al eliminar un producto con id ${req.params.id}` });
    }
};
