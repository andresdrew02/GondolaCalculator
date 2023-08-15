import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function TablaPedidos({ pedido }) {

    if (pedido.setPedidos.length === 0) {
      return <p className="text-center text-2xl font-bold text-gray-700 p-2 sm:py-10 sm:px-10">No hay pedidos</p>;
    }

  return (
    <Table aria-label="Tabla del pedido del gondola" onClick={() => console.log(pedido)}>
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Pedido</TableColumn>
        <TableColumn>Dinero</TableColumn>
      </TableHeader>
      <TableBody>
        {pedido.setPedidos.map((e, i) => (
          <TableRow key={e.id}>
            <TableCell>{e.persona.nombre}</TableCell>
            <TableCell>
              {e.productos.map((producto) => producto.nombre).join(", ")}
            </TableCell>
            <TableCell>
              {e.dinero} €
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
