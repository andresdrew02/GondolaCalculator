import React, { useState } from "react";
import Pedido from "./classes/Pedido";
import SetPedido from "./classes/SetPedido";
import NewPersonaAndProductoForm from "./components/NewPersonaAndProductoForm";
import Persona from "./classes/Persona";
import TablaPedidos from "./components/TablaPedidos";
import BarraNavegacion from "./components/BarraNavegacion";
import { Button, Card, CardBody } from "@nextui-org/react";
import Alert from "./components/Alert";
import { generateRandomEmoji } from "./helpers/randomEmoji";
import { calculateSubTotal } from "./helpers/calculateSubTotal";
import { messageCreator } from "./helpers/messageCreator";
import { ToastContainer, toast } from "react-toastify";
import { ImCalculator } from "react-icons/im";
import { AiFillCopy } from 'react-icons/ai'
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [pedido, setPedido] = useState(new Pedido(new Date(), []));
  const [calculado, setCalculado] = useState(false);
  const [error, setError] = useState(false);
  const [mensajeError, setErrorMensaje] = useState("Error por defecto");
  const [total, setTotal] = useState(0);
  const notify = () =>
    toast.success("¡Copiado al portapapeles!", {
      theme: "colored",
    });

  const agregarHandler = (nombre, productos, dinero) => {
    const set = new SetPedido(new Persona(nombre), productos, dinero);
    setPedido(new Pedido(pedido.fecha, [...pedido.setPedidos, set]));
  };

  const calcularPedido = () => {
    setError(false);
    setCalculado(false);

    if (pedido.setPedidos.length === 0) {
      setError(true);
      setErrorMensaje("¡No puedes calcular un pedido vacío!");
      return;
    }

    let totalCalculado = 0;

    pedido.setPedidos.forEach((set) => {
      set.productos.forEach((producto) => {
        totalCalculado = totalCalculado + parseFloat(producto.precio);
      });
    });

    setTotal(totalCalculado);
    setCalculado(true);
  };

  return (
    <>
      <ToastContainer />
      <BarraNavegacion />
      {error && (
        <div className="p-2">
          <Alert alert={mensajeError} />
        </div>
      )}
      <main className="p-10">
        <NewPersonaAndProductoForm addHandler={agregarHandler} />
        <div className="p-4">
          <TablaPedidos pedido={pedido} />
        </div>
        {pedido.setPedidos.length > 0 && (
          <Button color="secondary" onClick={calcularPedido} startContent={<ImCalculator/>}>
            Calcular Pedido
          </Button>
        )}

        {calculado && (
          <>
            <h1 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4">
              Pedido calculado:
            </h1>
            <div className="flex flex-col gap-6">
              {pedido.setPedidos.map((e, i) => (
                <div>
                  <h1
                    key={i}
                    className="mb-2 text-lg font-semibold text-gray-700"
                  >
                    {generateRandomEmoji()}{" "}
                    {e.persona.nombre.charAt(0).toUpperCase() +
                      e.persona.nombre.slice(1)}
                  </h1>
                  <Card>
                    <CardBody>
                      <ul>
                        {e.productos.map((producto) => (
                          <li key={producto.id}>
                            {" "}
                            -{" "}
                            <strong className="text-lg">
                              {producto.nombre}
                            </strong>
                            , precio:{" "}
                            <strong className="text-xl text-purple-700">
                              {producto.precio} €
                            </strong>
                          </li>
                        ))}
                        <li className="text-md text-gray-800 font-bold">
                          Pone {e.dinero} €
                        </li>
                        <li className="text-xl text-blue-800 font-bold">
                          {e.dinero - calculateSubTotal(e.productos) < 0 ? (
                            <strong className="text-red-700">Debe</strong>
                          ) : (
                            <strong className="text-green-700">Cambio</strong>
                          )}{" "}
                          :{" "}
                          {Math.abs(
                            e.dinero - calculateSubTotal(e.productos)
                          ).toFixed(2)}{" "}
                          €
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                  <h2 className="mb-2 text-xl font-semibold text-gray-800 mt-2">
                    {" "}
                    Subtotal de{" "}
                    {e.persona.nombre.charAt(0).toUpperCase() +
                      e.persona.nombre.slice(1)}
                    :{" "}
                    <strong className="text-purple-700">
                      {calculateSubTotal(e.productos)} €{" "}
                    </strong>
                  </h2>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center mt-5">
              <h2 className="mb-2 text-xl font-semibold text-gray-800 mt-4">
                Total de los totales:{" "}
                <strong className="text-red-700">{total} € </strong>
              </h2>
              <Button
                color="success"
                className="text-white font-bold"
                onClick={() => {
                  navigator.clipboard.writeText(messageCreator(pedido, total));
                  notify();
                }}
                endContent={<AiFillCopy/>}
              >
                Copiar mensaje para WhatsApp
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
