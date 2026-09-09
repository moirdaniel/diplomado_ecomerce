import type { CartItem } from "../../types/Cart";
import { formatCurrency } from "../../utils/currency";
import { getProductPrice } from "../../utils/order";

// Permite revisar cantidades y precios antes de confirmar. Usamos la misma
// función de precio que el carrito para aplicar las ofertas de forma consistente.
export function CheckoutSummary({ items }: { items: CartItem[] }) {
  return (
    <section className="panel">
      <h2>Resumen de productos</h2>
      <ul className="checkout-items">
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <img src={product.image} alt="" width="64" height="64" />
            <div>
              <strong>{product.name}</strong>
              <p>
                {quantity} × {formatCurrency(getProductPrice(product))}
              </p>
            </div>
            <strong>
              {formatCurrency(getProductPrice(product) * quantity)}
            </strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
