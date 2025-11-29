const API_BASE = "/api";

export async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        return res.ok ? (data.payload || []) : [];
    } catch (e) {
        return [];
    }
}

export async function fetchProductById(id) {
    try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        const data = await res.json();
        return res.ok && data.payload ? data.payload[0] : null;
    } catch (e) {
        return null;
    }
}

export async function createSale(payload) {
    try {
        const res = await fetch(`${API_BASE}/sales`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return res.ok ? data : null;
    } catch (e) {
        return null;
    }
}
