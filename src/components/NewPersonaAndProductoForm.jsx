import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { BsFillTrashFill, BsPlusLg } from "react-icons/bs";
import { useRef, useState } from "react";
import Producto from "../classes/Producto";
import Alert from "./Alert";

export default function NewPersonaAndProductoForm({ addHandler }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productos, setProductos] = useState([new Producto("", "")]);
  const [error, setError] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("Error por defecto");
  const nombre = useRef();
  const dinero = useRef();
  const cerrarButton = useRef()
  const NOMBRE_PRODUCTO = 0;
  const PRECIO_PRODUCTO = 1;

  const editarProducto = (id, tipo, valor) => {
    setError(false);

    //Recuperamos el producto
    const producto = productos.find((producto) => producto.id === id);

    //Editamos el campo correspondiente
    if (tipo === NOMBRE_PRODUCTO) {
      producto.nombre = valor;
    }
    if (tipo === PRECIO_PRODUCTO) {
      producto.precio = valor;
    }

    //Editamos el estado
    const productosEditados = productos.map((productoArray) =>
      productoArray.id === id ? producto : productoArray
    );
    setProductos(productosEditados);
  };

  const addOtroProducto = () => {
    setError(false);
    setProductos([...productos, new Producto("", "")]);
  };

  const deleteProducto = (id) => {
    //Si solo queda un producto en el array no se puede borrar, y si no, filtramos el array y borramos el producto por id
    setError(false);
    if (productos.length === 1) {
      setError(true);
      setErrorMensaje("¡No puedes borrar todos los productos!");
      return;
    }
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  //comprobamos si el array está vacío, que el nombre no está vacío o si existen campos vacios en los productos
  const beforeAgregar = (event) => {
    event.preventDefault();

    if (nombre.current.value === "") {
      setErrorNombre(true);
      setErrorMensaje("¡El nombre es obligatorio!");
      return;
    }

    if (dinero.current.value === "") {
      setErrorNombre(true);
      setErrorMensaje("¡El dinero es obligatorio!");
      return;
    }

    if (productos.length === 0) {
      setError(true);
      setErrorMensaje("¡Debes agregar al menos un producto!");
      productos.push(new Producto("", ""));
      return;
    }
    if (
      productos.some(
        (producto) => producto.nombre === "" || producto.precio === ""
      )
    ) {
      setError(true);
      setErrorMensaje("¡Todos los campos son obligatorios!");
      return;
    }

    //Pasamos los datos al callback
    const productos_static = productos
    addHandler(nombre.current.value, productos_static, dinero.current.value);

    //reseteamos el modal
    setProductos([new Producto("", "")])
    cerrarButton.current.click()
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" startContent={<BsPlusLg/>}>Agregar nuevo</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="lg"
        backdrop="blur"
      >
        <form onSubmit={beforeAgregar}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Nuevo set de pedido
                </ModalHeader>
                <ModalBody>
                  {errorNombre && (
                    <Alert alert={errorMensaje} />
                  )}
                  <Input
                    isRequired
                    type="text"
                    label="Nombre del localero"
                    placeholder="Samuel Drogados"
                    className="max-w-xs"
                    onChange={() => setErrorNombre(false)}
                    ref={nombre}
                  />
                  <Divider />
                  <Card>
                    <CardHeader>
                      <h1 className="text-lg text-gray-800 uppercase font-bold">
                        Productos
                      </h1>
                    </CardHeader>
                    <CardBody>
                      {error && <Alert alert={errorMensaje} />}
                      {productos.map((producto) => (
                        <section key={producto.id}>
                          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-4 justify-center items-center">
                            <Input
                              isRequired
                              type="text"
                              label="Nombre del producto"
                              value={producto.nombre}
                              onChange={(e) =>
                                editarProducto(
                                  producto.id,
                                  NOMBRE_PRODUCTO,
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              isRequired
                              type="text"
                              label="Precio"
                              value={producto.precio}
                              onChange={(e) =>
                                editarProducto(
                                  producto.id,
                                  PRECIO_PRODUCTO,
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              isIconOnly
                              color="danger"
                              aria-label="Delete"
                              onClick={() => deleteProducto(producto.id)}
                            >
                              <BsFillTrashFill />
                            </Button>
                          </div>
                          <Divider />
                        </section>
                      ))}
                    </CardBody>
                  </Card>
                  {productos.length !== 0 && (
                    <Button color="primary" onClick={addOtroProducto}>
                      Agregar otro producto
                    </Button>
                  )}
                  <Divider />
                  <Input
                    isRequired
                    type="text"
                    label="Dinero que pone"
                    ref={dinero}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose} ref={cerrarButton}>
                    Cerrar
                  </Button>
                  <Button color="primary" onClick={beforeAgregar}>
                    Agregar set
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
