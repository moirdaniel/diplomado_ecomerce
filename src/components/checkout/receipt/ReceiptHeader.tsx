import type { Order } from "../../../types/Order";

// El identificador se creó al confirmar la compra. Mostrar el mismo ID
// en cada render permite reconocer una orden durante toda la impresión.
export function ReceiptHeader({ order }: { order: Order }) {
  return (
    <header className="receipt-header">
      <h2>MOIR GAMES</h2>
      <p>
        Comprobante de pago
        <br />
      </p>
      <p>Orden: {order.id}</p>
    </header>
  );
}
