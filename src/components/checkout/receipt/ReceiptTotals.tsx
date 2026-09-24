import { formatCurrency } from "../../../utils/currency";
import type { Order } from "../../../types/Order";

// Pick pide únicamente los tres importes que necesitamos. Por eso este
// componente sirve en el checkout, antes de crear una orden, y en la boleta.
// Aquí se formatean valores ya calculados: no se vuelve a sumar el IVA.
export function ReceiptTotals({
  order,
}: {
  order: Pick<Order, "subtotal" | "tax" | "total">;
}) {
  return (
    <dl className="receipt-totals">
      <div>
        <dt>Neto</dt>
        <dd>{formatCurrency(order.subtotal)}</dd>
      </div>
      <div>
        <dt>IVA simulado (19%)</dt>
        <dd>{formatCurrency(order.tax)}</dd>
      </div>
      <div className="total-line">
        <dt>Total</dt>
        <dd>{formatCurrency(order.total)}</dd>
      </div>
    </dl>
  );
}
