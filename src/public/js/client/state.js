const LS_KEY_NAME = "customerName";
const LS_KEY_CART = "cart";
const LS_KEY_THEME = "theme";
const LS_KEY_LAST_TOTAL = "lastTotal";
const LS_KEY_LAST_SALE = "lastSaleId";

export function saveName(name) {
    localStorage.setItem(LS_KEY_NAME, name);
}

export function getName() {
    return localStorage.getItem(LS_KEY_NAME) || "";
}

export function saveCart(cart) {
    localStorage.setItem(LS_KEY_CART, JSON.stringify(cart));
}

export function getCart() {
    const raw = localStorage.getItem(LS_KEY_CART);
    return raw ? JSON.parse(raw) : [];
}

export function setTheme(mode) {
    localStorage.setItem(LS_KEY_THEME, mode);
}

export function getTheme() {
    return localStorage.getItem(LS_KEY_THEME) || "light";
}

export function saveLastSale(id) {
    localStorage.setItem(LS_KEY_LAST_SALE, id || "");
}

export function saveLastTotal(total) {
    localStorage.setItem(LS_KEY_LAST_TOTAL, total || 0);
}

export function getLastTotal() {
    return localStorage.getItem(LS_KEY_LAST_TOTAL) || 0;
}
