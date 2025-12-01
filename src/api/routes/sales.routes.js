import { Router } from "express";
import connection from "../database/db.js";

const router = Router();

router.post("/", async (req, res) => {
    
    const { customerName, items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: "Carrito vacío" });
    }

    try {
        let total = 0;

        
        items.forEach(item => {
            total += item.price * item.quantity;
        });

       
        const sqlTicket = "INSERT INTO tickets (nombreUsuario, precioTotal) VALUES (?, ?)";
        const [resultTicket] = await connection.query(sqlTicket, [customerName, total]);
        const ticketId = resultTicket.insertId;

        for (const item of items) {
            for (let i = 0; i < item.quantity; i++) {
                const sqlDetalle = "INSERT INTO productos_tickets (idTicket, idProducto, precio_unitario) VALUES (?, ?, ?)";
                await connection.query(sqlDetalle, [ticketId, item.productId, item.price]);
            }
        }

        res.status(201).json({ saleId: ticketId });

    } catch (error) {
        console.error("Error en venta:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

export default router;