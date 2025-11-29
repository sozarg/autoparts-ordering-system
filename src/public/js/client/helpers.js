import { getCart, saveCart } from "./state.js";

export function addToCart(prod) {
    const cart = getCart();
    const found = cart.find((i) => i.id === prod.id);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ id: prod.id, name: prod.nombre, price: prod.precio, quantity: 1 });
    }
    saveCart(cart);
}
