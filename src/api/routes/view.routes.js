import { Router } from "express";
const router = Router();

import ProductModel from "../models/product.models.js";
import UserModel from "../models/user.models.js";
import { requireLogin } from "../middlewares/middlewares.js";

router.get("/login", (req, res) => {
    res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
    const { correo, password } = req.body;
    try {
        const [rows] = await UserModel.findByCorreo(correo);
        if (rows.length === 0 || rows[0].password !== password) {
            return res.render("login", { error: "Credenciales invalidas" });
        }
        req.session.user = { id: rows[0].id, correo: rows[0].correo };
        res.redirect("/");
    } catch (error) {
        console.error("Error en login", error.message);
        res.render("login", { error: "Error en login" });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

router.get(["/", "/index"], requireLogin, async (req, res) => {
    try {
        const [rows] = await ProductModel.selectAllProducts();
        res.render("index", { productos: rows, usuario: req.session.user });
    } catch (error) {
        console.error("Error obteniendo productos para la vista", error.message);
        res.render("index", { productos: [], usuario: req.session.user });
    }
});

router.get("/consultar", requireLogin, (req, res) => res.render("get"));
router.get("/crear", requireLogin, (req, res) => res.render("create"));
router.get("/modificar", requireLogin, (req, res) => res.render("update"));
router.get("/eliminar", requireLogin, (req, res) => res.render("delete"));

export default router;
