import type { OrderItem } from "../../../types/Order";
import { formatCurrency } from "../../../utils/currency";

// La línea usa los datos guardados en OrderItem, no consulta el catálogo.
// Así conserva el precio de la compra aunque cambie el producto después.
export function ReceiptItem({ item }: { item: OrderItem }) {
  return (
    <div className="receipt-item">
      <p>{item.name}</p>
      <div>
        <span>
          {item.quantity} × {formatCurrency(item.unitPrice)}
        </span>
        <span>{formatCurrency(item.subtotal)}</span>
      </div>
    </div>
  );
}
