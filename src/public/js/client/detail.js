import { fetchProductById } from "./api.js";
import { initThemeToggle } from "./theme.js";
import { addToCart } from "./helpers.js";
import { getName } from "./state.js";

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function init() {
    initThemeToggle();
    const name = getName();
    if (!name) {
        window.location.href = "welcome.html";
        return;
    }
    document.getElementById("client-name").textContent = name;

    const id = getIdFromUrl();
    const prod = id ? await fetchProductById(id) : null;
    const container = document.getElementById("detail");
    if (!prod) {
        container.innerHTML = "<p>No se encontró el producto</p>";
        return;
    }
    container.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}" style="max-width:300px;">
        <h2>${prod.nombre}</h2>
        <p>Tipo: ${prod.tipo}</p>
        <p>Precio: $${prod.precio}</p>
        <button id="add">Agregar al carrito</button>
    `;
    document.getElementById("add")?.addEventListener("click", () => {
        addToCart(prod);
    });
}

document.addEventListener("DOMContentLoaded", init);
