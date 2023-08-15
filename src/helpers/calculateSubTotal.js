export function calculateSubTotal(productos) {
    let total = 0
    productos.forEach((producto) => {
        total = total + parseFloat(producto.precio)
    })
    return total
}