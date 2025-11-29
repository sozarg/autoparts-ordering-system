const formModificar = document.getElementById("form-modificar");
const salidaModificar = document.getElementById("resultado-modificar");

formModificar?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        id: formModificar.id.value,
        name: formModificar.name.value,
        type: formModificar.type.value,
        price: formModificar.price.value,
        image: formModificar.image.value,
        active: formModificar.active.value
    };
    try {
        const res = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        salidaModificar.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        salidaModificar.textContent = "Error actualizando producto";
    }
});
