// Middleware logger global
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

// Valida que el id sea numerico
const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "El id debe ser un numero valido"
        });
    }

    req.id = parseInt(id, 10);
    next();
};

const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect("/login");
};

export {
    loggerUrl,
    validateId,
    requireLogin
};
