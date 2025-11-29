import { getName, getCart, getLastTotal, saveCart, saveLastSale, saveLastTotal } from "./state.js";
import { initThemeToggle } from "./theme.js";

function renderTicket() {
    const name = getName();
    const items = getCart();
    const total = getLastTotal();
    document.getElementById("ticket-name").textContent = name;
    document.getElementById("ticket-date").textContent = new Date().toLocaleString();
    document.getElementById("ticket-total").textContent = `$${total}`;

    const list = document.getElementById("ticket-items");
    list.innerHTML = "";
    items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "ticket-item";
        row.innerHTML = `
            <span>${item.name}</span>
            <span>Cant: ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
        `;
        list.appendChild(row);
    });
}

function restart() {
    saveCart([]);
    saveLastSale("");
    saveLastTotal(0);
    window.location.href = "welcome.html";
}

function init() {
    initThemeToggle();
    renderTicket();
    document.getElementById("restart")?.addEventListener("click", restart);
}

document.addEventListener("DOMContentLoaded", init);
