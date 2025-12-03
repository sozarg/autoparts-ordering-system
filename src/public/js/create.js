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
        if (res.ok) {
            alert(`Producto creado con ID: ${json.productId}`);
            window.location.href = "/"; // redirigfe dashboard ver producto
} else {
    salidaCrear.textContent = json.message || "Error desconocido";
}
    } catch (error) {
        salidaCrear.textContent = "Error creando producto";
    }
});
