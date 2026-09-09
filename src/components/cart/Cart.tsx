import type { CartController } from "../../hooks/useCart";
import { Button } from "../common/Button";
import { CartIcon } from "../common/CartIcon";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import "./cart.css";

// El panel recibe el carrito completo, pero no guarda una copia de sus datos.
// Cada botón llama a una acción de useCart y React vuelve a mostrar el resultado.
export function Cart({
  cart,
  onCheckout,
}: {
  cart: CartController;
  onCheckout: () => void;
}) {
  return (
    <aside
      className="cart-panel"
      id="carrito"
      aria-labelledby="cart-title"
      tabIndex={-1}
    >
      <h2 id="cart-title">Tu carrito</h2>
      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <CartIcon />
          <h3>Tu carrito está vacío.</h3>
          <p>Agrega algunos productos para comenzar tu compra.</p>
        </div>
      ) : (
        <>
          {/* La clave es el ID del producto: la fila se conserva al cambiar la cantidad. */}
          <ul className="cart-list">
            {cart.items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncrease={cart.addProduct}
                onDecrease={cart.decreaseQuantity}
                onRemove={cart.removeProduct}
              />
            ))}
          </ul>
          <CartSummary total={cart.subtotal} quantity={cart.totalQuantity} />
          <Button className="full-width" onClick={onCheckout}>
            Ir al checkout
          </Button>
          <Button
            className="full-width clear-cart"
            variant="secondary"
            onClick={cart.clearCart}
          >
            Vaciar carrito
          </Button>
        </>
      )}
    </aside>
  );
}
