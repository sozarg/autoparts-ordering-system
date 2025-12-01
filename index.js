import express from "express";
const app = express();

import environments from "./src/api/config/environments.js";
const PORT = environments.port;
const SESSION_KEY = environments.session_key;

import cors from "cors";
import session from "express-session";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import salesRoutes from "./src/api/routes/sales.routes.js";
import { join, __dirname } from "./src/api/utils/index.js";
import UserModel from "./src/api/models/user.models.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerUrl);

app.use(session({
    secret: SESSION_KEY || "secret",
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.user || null;
    next();
});

app.use(express.static(join(__dirname, "src/public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));
app.disable('view cache');
// Rutas
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes); 
app.use("/", viewRoutes);

app.post("/api/users", async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            return res.status(400).json({ message: "Datos invalidos" });
        }
        await UserModel.insertUser(correo, password);
        res.status(201).json({ message: "Usuario creado con exito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de autopartes escuchando en el puerto ${PORT}`);
});