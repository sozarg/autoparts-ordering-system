import { Router } from "express";
const router = Router();

import ProductModel from "../models/product.models.js";
import UserModel from "../models/user.models.js";
import { requireLogin } from "../middlewares/middlewares.js";

router.get("/login", (req, res) => {
    if (req.session.user) {
        console.log(">> Login GET: Usuario ya logueado, redirigiendo a /");
        return res.redirect("/");
    }
    res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
    const { correo, password } = req.body;

    console.log(`>> Intento de login con: ${correo} y pass: ${password}`);

    try {
        const result = await UserModel.findByCorreo(correo);
        console.log(">> Resultado DB crudo:", result);

        const rows = result[0];

        if (!rows || rows.length === 0) {
            console.log(">> Error: Usuario no encontrado en BD");
            return res.render("login", { error: "Usuario no encontrado" });
        }

        const usuario = rows[0]; 
        console.log(">> Usuario encontrado:", usuario);

        if (usuario.password != password) {
            console.log(`>> Error: Contraseña incorrecta. Esperaba: ${usuario.password}, Recibió: ${password}`);
            return res.render("login", { error: "Contraseña incorrecta" });
        }

        req.session.user = { id: usuario.id, correo: usuario.correo };
        console.log(">> Sesión creada, guardando...");

        req.session.save((err) => {
            if (err) {
                console.error(">> Error fatal guardando sesión:", err);
                return res.render("login", { error: "Error de sesión" });
            }
            console.log(">> Sesión guardada con éxito. Redirigiendo a /");
            res.redirect("/");
        });

    } catch (error) {
        console.error(">> Error CATASTRÓFICO en login:", error);
        res.render("login", { error: "Error interno" });
    }
});

router.post("/logout", (req, res) => {
    console.log(">> Cerrando sesión...");
    req.session.destroy(() => {
        console.log(">> Sesión destruida. Redirigiendo a Welcome.");
        res.redirect("/welcome.html");
    });
});

router.get(["/", "/index"], async (req, res) => {
    console.log(">> Cargando Dashboard. Usuario en sesión:", req.session.user);
    try {
        res.render("index", {
            usuario: req.session.user || null
        });
    } catch (error) {
        res.render("index", { usuario: null });
    }
});

router.get("/consultar", requireLogin, (req, res) => res.render("get"));
router.get("/crear", requireLogin, (req, res) => res.render("create"));
router.get("/modificar", requireLogin, (req, res) => res.render("update"));
router.get("/eliminar", requireLogin, (req, res) => res.render("delete"));

export default router;