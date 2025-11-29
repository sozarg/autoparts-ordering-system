import { fetchProducts } from "./api.js";
import { getCart, saveCart, getName } from "./state.js";
import { initThemeToggle } from "./theme.js";

const PAGE_SIZE = 4;

function paginate(list, page) {
    const start = page * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
}

function renderSection(title, list, containerId, pageState) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "section-header";
    header.innerHTML = `<h2>${title}</h2>`;

    const pag = document.createElement("div");
    pag.className = "pagination";
    const prev = document.createElement("button");
    prev.textContent = "Anterior";
    prev.disabled = pageState.page === 0;
    prev.addEventListener("click", () => {
        pageState.page = Math.max(0, pageState.page - 1);
        renderProducts(list, pageState);
    });
    const next = document.createElement("button");
    next.textContent = "Siguiente";
    const maxPage = Math.ceil(list.length / PAGE_SIZE) - 1;
    next.disabled = pageState.page >= maxPage;
    next.addEventListener("click", () => {
        pageState.page = Math.min(maxPage, pageState.page + 1);
        renderProducts(list, pageState);
    });
    pag.append(prev, next);
    header.appendChild(pag);
    container.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid";
    paginate(list, pageState.page).forEach((prod) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h4>${prod.nombre}</h4>
            <p>$${prod.precio}</p>
            <div class="controls">
                <button class="add">Agregar</button>
                <a href="detail.html?id=${prod.id}">Ver</a>
            </div>
        `;
        card.querySelector(".add").addEventListener("click", () => addToCart(prod));
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function renderProducts(products, pageState) {
    const autos = products.filter((p) => (p.tipo || "").toLowerCase() === "autoparte");
    const servs = products.filter((p) => (p.tipo || "").toLowerCase() === "servicio");
    renderSection("Autopartes", autos, "autoparts", pageState.autos);
    renderSection("Servicios", servs, "services", pageState.servs);
}

function addToCart(prod) {
    const cart = getCart();
    const found = cart.find((i) => i.id === prod.id);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ id: prod.id, name: prod.nombre, price: prod.precio, quantity: 1 });
    }
    saveCart(cart);
}

async function init() {
    initThemeToggle();
    const name = getName();
    if (!name) {
        window.location.href = "welcome.html";
        return;
    }
    document.getElementById("client-name").textContent = name;

    const products = await fetchProducts();
    const state = { autos: { page: 0 }, servs: { page: 0 } };
    renderProducts(products, state);
}

document.addEventListener("DOMContentLoaded", init);
