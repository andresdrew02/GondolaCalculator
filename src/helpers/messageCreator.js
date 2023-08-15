import { calculateSubTotal } from "./calculateSubTotal";

export function messageCreator(pedido, total, nota) {
    let mensaje = "*Pedido del " + pedido.fecha.getDate() + "/" + (pedido.fecha.getMonth() + 1) + "/" + pedido.fecha.getFullYear() + "*\n";
    pedido.setPedidos.forEach((set) => {
        mensaje += "*" + set.persona.nombre.charAt(0).toUpperCase().concat(set.persona.nombre.slice(1)) + "*" + "\n";
        set.productos.forEach((producto) => {
            mensaje += "_" + producto.nombre + "_" + " ➡️ " + producto.precio + "€\n";
        })
        mensaje += "*Pone: " + set.dinero + "€*\n";
        mensaje += calculateSubTotal(set.productos) > parseFloat(set.dinero) ? "*Debe: " + Math.abs(calculateSubTotal(set.productos) - parseFloat(set.dinero)).toFixed(2) +"€*\n" : "*Cambio: " + Math.abs(calculateSubTotal(set.productos) - parseFloat(set.dinero)).toFixed(2) + "€*\n"
        mensaje += "*Subtotal de " + set.persona.nombre + ":* " + calculateSubTotal(set.productos) + " €\n"
        mensaje += "\n\n"
    })
    mensaje += "*Nota opcional:* " + nota + "\n\n"
    mensaje += "*Total de los totales: " + total.toFixed(2) + " €*";
    return mensaje
}