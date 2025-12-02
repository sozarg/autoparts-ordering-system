const formModificar = document.getElementById("form-modificar");
const salidaModificar = document.getElementById("resultado-modificar");

formModificar?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formModificar);
    try {
        const res = await fetch("/api/products", {
            method: "PUT",
            body: formData
        });
        const json = await res.json();
        salidaModificar.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        salidaModificar.textContent = "Error actualizando producto";
    }
});
