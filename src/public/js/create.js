const formCrear = document.getElementById("form-crear");
const salidaCrear = document.getElementById("resultado-crear");

formCrear?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formCrear);
    try {
        const res = await fetch("/api/products", {
            method: "POST",
            body: formData
        });
        const json = await res.json();
        salidaCrear.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        salidaCrear.textContent = "Error creando producto";
    }
});
