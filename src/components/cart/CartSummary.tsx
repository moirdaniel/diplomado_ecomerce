import { formatCurrency } from "../../utils/currency";

// Este resumen solo presenta valores calculados por useCart.
// quantity suma unidades: dos copias del mismo juego cuentan como dos productos.
export function CartSummary({
  total,
  quantity,
}: {
  total: number;
  quantity: number;
}) {
  return (
    <div className="cart-summary">
      <p>
        <span>Productos</span>
        <span>{quantity}</span>
      </p>
      <p className="total-line">
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </p>
      <small>USD de demostración. IVA incluido simulado.</small>
    </div>
  );
}
