import { Router } from "express";
const router = Router();

import ProductModel from "../models/product.models.js";
import UserModel from "../models/user.models.js";
import { requireLogin } from "../middlewares/middlewares.js";
import bcrypt from "bcryptjs";

router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
    const { correo, password } = req.body;
    try {
        const result = await UserModel.findByCorreo(correo);
        const rows = result[0];

        if (!rows || rows.length === 0) {
            return res.render("login", { error: "Usuario no encontrado" });
        }

        const usuario = rows[0];
        const ok = await bcrypt.compare(password, usuario.password);
        if (!ok) {
            return res.render("login", { error: "Contraseña incorrecta" });
        }

        req.session.user = { id: usuario.id, correo: usuario.correo };
        req.session.save((err) => {
            if (err) {
                return res.render("login", { error: "Error de sesión" });
            }
            res.redirect("/");
        });

    } catch (error) {
        res.render("login", { error: "Error interno" });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/welcome.html");
    });
});

router.get(["/", "/index"], async (req, res) => {
    try {
        const [rows] = await ProductModel.selectAllProductsAdmin();
        res.render("index", {
            usuario: req.session.user || null,
            productos: rows
        });
    } catch (error) {
        res.render("index", { usuario: req.session.user || null, productos: [] });
    }
});

router.get("/consultar", requireLogin, (req, res) => res.render("get"));
router.get("/crear", requireLogin, (req, res) => res.render("create"));
router.get("/modificar", requireLogin, (req, res) => res.render("update"));
router.get("/eliminar", requireLogin, (req, res) => res.render("delete"));

export default router;
