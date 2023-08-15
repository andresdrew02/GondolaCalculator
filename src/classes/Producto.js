import generateRandomId from '../helpers/generateId'

class Producto {
  constructor(nombre, precio) {
    this.id = generateRandomId();
    this.nombre = nombre;
    this.precio = precio;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get precio() {
    return this._precio;
  }

  set precio(precio) {
    this._precio = precio;
  }
}

export default Producto;
