import { getCart, saveCart, getName, saveLastSale, saveLastTotal } from "./state.js";
import { initThemeToggle } from "./theme.js";
import { createSale } from "./api.js";

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const cart = getCart(); 

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align: center; padding: 2rem; color: #666;'>El carrito está vacío</p>";
    }

    cart.forEach((item) => {
        
        const nombreProducto = item.nombre || item.name || "Producto sin nombre";
        const precioProducto = parseFloat(item.precio || item.price || 0);

        total += precioProducto * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <div style="flex: 1;">
                <span style="font-weight: 500;">${nombreProducto}</span>
            </div>
            
            <div class="qty" style="margin: 0 1rem;">
                <button class="btn-delete" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">
                    Eliminar
                </button>
            </div>
            
            <div style="font-weight: bold; min-width: 80px; text-align: right;">
                $${precioProducto}
            </div>
        `;

        row.querySelector(".btn-delete").addEventListener("click", () => removeItem(item.id));

        container.appendChild(row);
    });

    totalEl.textContent = `$${total}`;
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id); 
    saveCart(cart); 
    renderCart();  
}

async function confirmCart() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const proceed = window.confirm("¿Confirmar compra?");
    if (!proceed) return;

    const customerName = getName() || "Cliente";

    const payload = {
        customerName,
        items: cart.map((i) => ({
            productId: i.id,
            quantity: 1, 
            price: parseFloat(i.precio || i.price)
        }))
    };

    const res = await createSale(payload);

    if (res && res.saleId) {
        saveLastSale(res.saleId);

        const total = cart.reduce((acc, i) => acc + parseFloat(i.precio || i.price), 0);
        saveLastTotal(total);

       

        window.location.href = "ticket.html";
    } else {
        alert("Error al procesar la venta. Intenta nuevamente.");
    }
}

function init() {
    initThemeToggle();
    const name = getName();
    if (document.getElementById("client-name")) {
        document.getElementById("client-name").textContent = name || "Invitado";
    }

    renderCart();

    const btnConfirm = document.getElementById("confirm-cart");
    if (btnConfirm) {
        btnConfirm.addEventListener("click", confirmCart);
    }
}

document.addEventListener("DOMContentLoaded", init);