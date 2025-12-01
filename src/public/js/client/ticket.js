import { getName, getCart, getLastTotal, saveCart, saveLastSale, saveLastTotal } from "./state.js";
import { initThemeToggle } from "./theme.js";

function renderTicket() {
    const name = getName();
    const items = getCart(); 
    const total = getLastTotal();

    document.getElementById("ticket-name").textContent = name || "Cliente";
    document.getElementById("ticket-date").textContent = new Date().toLocaleString();
    document.getElementById("ticket-total").textContent = `$${total}`;

    const list = document.getElementById("ticket-items");
    list.innerHTML = "";

    items.forEach((item) => {
        const nombreProducto = item.nombre || item.name || "Producto desconocido";
        const precioProducto = parseFloat(item.precio || item.price || 0);

        const row = document.createElement("div");
        row.className = "ticket-item";

        row.innerHTML = `
            <div style="flex-grow: 1;">
                <strong>${nombreProducto}</strong>
                <span style="font-size: 0.9rem; color: #666; margin-left: 5px;">(Cant: ${item.quantity})</span>
            </div>
            <div style="font-weight: bold;">
                $${precioProducto * item.quantity}
            </div>
        `;
        list.appendChild(row);
    });
}

function restart() {
    saveCart([]);
    saveLastSale("");
    saveLastTotal(0);
    window.location.href = "/";
}

function init() {
    initThemeToggle();
    renderTicket();
    document.getElementById("restart")?.addEventListener("click", restart);
}

document.addEventListener("DOMContentLoaded", init);