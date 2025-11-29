const formCrear = document.getElementById("form-crear");
const salidaCrear = document.getElementById("resultado-crear");

formCrear?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        name: formCrear.name.value,
        type: formCrear.type.value,
        price: formCrear.price.value,
        image: formCrear.image.value
    };
    try {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        salidaCrear.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        salidaCrear.textContent = "Error creando producto";
    }
});
