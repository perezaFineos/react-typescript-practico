import { Tarjeta } from "./Tarjeta";
import type { Producto } from "../types/producto";

type ListaProductosProps = {
  items: Producto[];
};

export function ListaProductos({ items }: ListaProductosProps) {
  return (
    <div>
      {items.map((producto) => (
        <Tarjeta key={producto.id} titulo={producto.nombre}>
          <p>Precio: {producto.precio.toFixed(2)} €</p>
        </Tarjeta>
      ))}
    </div>
  );
}
