import { getTheme, setTheme } from "./state.js";

export function applyTheme() {
    const current = getTheme();
    if (current === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

export function initThemeToggle() {
    applyTheme();
    const btn = document.getElementById("btn-theme");
    btn?.addEventListener("click", () => {
        const next = document.body.classList.contains("dark") ? "light" : "dark";
        setTheme(next);
        applyTheme();
    });
}
