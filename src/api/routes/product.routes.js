import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";
import { getAllProducts, getProductById, createProduct, updateProduct, removeProduct } from "../controllers/product.controllers.js";

// Lista de autopartes/servicios
router.get("/", getAllProducts);

// Detalle por id
router.get("/:id", validateId, getProductById);

// Alta de producto
router.post("/", createProduct);

// Modificacion
router.put("/", updateProduct);

// Baja (logica/fisica segun definicion final)
router.delete("/:id", validateId, removeProduct);

export default router;
