import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";
import { upload } from "../middlewares/upload.js";
import { getAllProducts, getProductById, createProduct, updateProduct, removeProduct, activateProduct } from "../controllers/product.controllers.js";

// Lista de autopartes/servicios
router.get("/", getAllProducts);

// Detalle por id
router.get("/:id", validateId, getProductById);

// Alta de producto (con imagen)
router.post("/", upload.single("image"), createProduct);

// Modificacion (imagen opcional)
router.put("/", upload.single("image"), updateProduct);

// Baja (logica/fisica segun definicion final)
router.delete("/:id", validateId, removeProduct);

// Activar producto
router.put("/:id/activate", validateId, activateProduct);

export default router;
