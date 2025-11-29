import { getCart, saveCart, getName, saveLastSale, saveLastTotal } from "./state.js";
import { initThemeToggle } from "./theme.js";
import { createSale } from "./api.js";

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const cart = getCart();
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <span>${item.name}</span>
            <div class="qty">
                <button class="dec">-</button>
                <span>${item.quantity}</span>
                <button class="inc">+</button>
            </div>
            <span>$${item.price * item.quantity}</span>
        `;
        row.querySelector(".inc").addEventListener("click", () => changeQty(item.id, 1));
        row.querySelector(".dec").addEventListener("click", () => changeQty(item.id, -1));
        container.appendChild(row);
    });

    totalEl.textContent = `$${total}`;
}

function changeQty(id, delta) {
    const cart = getCart().map((item) => {
        if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
    }).filter((i) => i.quantity > 0);
    saveCart(cart);
    renderCart();
}

async function confirmCart() {
    const cart = getCart();
    if (cart.length === 0) return;
    const proceed = window.confirm("¿Confirmar compra?");
    if (!proceed) return;

    const customerName = getName() || "Cliente";
    const payload = {
        customerName,
        items: cart.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price }))
    };

    const res = await createSale(payload);
    if (res && res.saleId) {
        saveLastSale(res.saleId);
    }
    const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    saveLastTotal(total);
    window.location.href = "ticket.html";
}

function init() {
    initThemeToggle();
    const name = getName();
    if (!name) {
        window.location.href = "welcome.html";
        return;
    }
    document.getElementById("client-name").textContent = name;
    renderCart();
    document.getElementById("confirm-cart")?.addEventListener("click", confirmCart);
}

document.addEventListener("DOMContentLoaded", init);
