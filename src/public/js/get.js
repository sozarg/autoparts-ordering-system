const formBuscar = document.getElementById("form-buscar");
const resultado = document.getElementById("resultado");

formBuscar?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formBuscar);
    const id = data.get("id");
    try {
        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        resultado.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        resultado.textContent = "Error consultando producto";
    }
});
