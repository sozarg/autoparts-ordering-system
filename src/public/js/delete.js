const formEliminar = document.getElementById("form-eliminar");
const salidaEliminar = document.getElementById("resultado-eliminar");

formEliminar?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = formEliminar.id.value;
    try {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        const json = await res.json();
        salidaEliminar.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        salidaEliminar.textContent = "Error eliminando producto";
    }
});
