import { saveName } from "./state.js";
import { initThemeToggle } from "./theme.js";

function init() {
    initThemeToggle();
    const input = document.getElementById("customer-name");
    const btn = document.getElementById("start-btn");
    btn?.addEventListener("click", () => {
        const name = (input?.value || "").trim();
        if (!name) return;
        saveName(name);
        window.location.href = "products.html";
    });
}

document.addEventListener("DOMContentLoaded", init);
