class Pedido {
  constructor(fecha,setPedidos){
    this.setPedidos = setPedidos
    this.fecha = fecha
  }

  get pedidos(){
    return this._setPedidos
  }

  set pedidos(pedidos){
    this._setPedidos = pedidos
  }
  
}

export default Pedido;
