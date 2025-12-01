import { fetchProducts, deleteProductAPI } from "./api.js";
import { getName } from "./state.js";
import { initThemeToggle } from "./theme.js";

const PAGE_SIZE = 4; 

const IS_ADMIN = document.getElementById("is-admin")?.value === "true";

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
        renderSection(title, list, containerId, pageState);
    });

    const next = document.createElement("button");
    next.textContent = "Siguiente";
    const maxPage = Math.ceil(list.length / PAGE_SIZE) - 1;
    next.disabled = pageState.page >= maxPage;

    next.addEventListener("click", () => {
        pageState.page = Math.min(maxPage, pageState.page + 1);
        renderSection(title, list, containerId, pageState);
    });

    pag.append(prev, next);
    header.appendChild(pag);
    container.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid";

    const visibleProducts = paginate(list, pageState.page);

    if (visibleProducts.length === 0) {
        grid.innerHTML = "<p>No hay productos aquí.</p>";
    } else {
        visibleProducts.forEach((prod) => {
            const card = document.createElement("div");
            card.className = "card";

            
            let buttonsHTML = '';

            if (IS_ADMIN) {
               
                buttonsHTML = `
                    <div class="controls" style="gap: 5px; margin-top: 10px;">
                        <a href="/modificar?id=${prod.id}" style="background: #ffc107; color: black; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 0.9rem;">Editar</a>
                        <button class="delete-btn" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Eliminar</button>
                    </div>
                `;
            } else {
                
                buttonsHTML = `
                    <div class="controls" style="margin-top: 10px;">
                        <button class="add">Agregar</button>
                        <a href="detail.html?id=${prod.id}" class="btn-link" style="margin-left: 5px;">Ver</a>
                    </div>
                `;
            }

            
            card.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'">
                <div class="card-body">
                    <h4>${prod.nombre}</h4>
                    <p class="price" style="font-weight: bold; font-size: 1.1rem;">$${prod.precio}</p>
                    ${buttonsHTML}
                </div>
            `;

            
            if (IS_ADMIN) {
                
                const btnDel = card.querySelector(".delete-btn");
                btnDel.addEventListener("click", async () => {
                    const success = await deleteProductAPI(prod.id);
                    if (success) {
                        init(); 
                    }
                });
            } else {
                
                const btnAdd = card.querySelector(".add");
                btnAdd.addEventListener("click", () => addToCart(prod));
            }

            grid.appendChild(card);
        });
    }
    container.appendChild(grid);
}

function renderProducts(products, state) {
    const autos = products.filter((p) => (p.tipo || "").toLowerCase() === "autoparte");
    const servs = products.filter((p) => (p.tipo || "").toLowerCase() === "servicio");
    renderSection("Autopartes", autos, "autoparts", state.autos);
    renderSection("Servicios", servs, "services", state.servs);
}

function addToCart(prod) {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch (e) { }

    const found = cart.find(i => i.id === prod.id);
    if (found) {
        alert("Ya tienes este producto en el carrito.");
    } else {
        cart.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`✅ ${prod.nombre} agregado al carrito.`);
    }
}

async function init() {
    initThemeToggle();

    
    if (!IS_ADMIN) {
        const name = localStorage.getItem("customerName");
        if (document.getElementById("client-name")) {
            document.getElementById("client-name").textContent = name || "Invitado";
        }
    }

    const products = await fetchProducts();
    const state = { autos: { page: 0 }, servs: { page: 0 } };
    renderProducts(products, state);
}

document.addEventListener("DOMContentLoaded", init);