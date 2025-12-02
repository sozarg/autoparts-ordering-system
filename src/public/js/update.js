const formModificar = document.getElementById("form-modificar");
const salidaModificar = document.getElementById("resultado-modificar");
const previewContainer = document.getElementById("preview-container");
const currentImg = document.getElementById("current-img");

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && formModificar) {
        const idInput = formModificar.querySelector("input[name='id']");
        if (idInput) idInput.value = id;
        try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            if (res.ok && data.payload && data.payload.length > 0) {
                const prod = data.payload[0];
                const nameInput = formModificar.querySelector("input[name='name']");
                const typeInput = formModificar.querySelector("input[name='type']");
                const priceInput = formModificar.querySelector("input[name='price']");
                const activeInput = formModificar.querySelector("select[name='active']");
                const existingImage = formModificar.querySelector("input[name='existingImage']");

                if (nameInput) nameInput.value = prod.nombre;
                if (typeInput) typeInput.value = prod.tipo;
                if (priceInput) priceInput.value = prod.precio;
                if (activeInput) activeInput.value = prod.activo;
                if (existingImage) existingImage.value = prod.imagen;

                if (prod.imagen && currentImg && previewContainer) {
                    currentImg.src = prod.imagen;
                    previewContainer.style.display = "block";
                }
            }
        } catch (error) {
            console.error("Error cargando producto", error);
        }
    }
});

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
