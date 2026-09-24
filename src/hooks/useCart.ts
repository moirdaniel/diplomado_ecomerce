import { useState } from "react";
import type { CartItem } from "../types/Cart";
import type { Product } from "../types/Product";
import { getProductPrice } from "../utils/order";

// Única fuente de estado del carrito; actualizaciones inmutables y stock limitado.
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addProduct = (product: Product) => {

    if (product.stock < 1) return;

    // Usamos el estado más reciente para no perder cantidades si se
    // hacen varios clics seguidos. Math.min impide superar el stock.
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity: 1 }];
      return current.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock),
            }
          : item,
      );
    });
  };

  // Al bajar de una unidad a cero, quitamos la fila del carrito.
  const decreaseQuantity = (productId: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeProduct = (productId: number) => {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId),
    );
  };

  const clearCart = () => setItems([]);

  // Los totales salen de los artículos actuales; guardarlos por separado
  // obligaría a actualizarlos en cada operación y podría desajustarlos.
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + getProductPrice(item.product) * item.quantity,
    0,
  );

  return {
    items,
    addProduct,
    decreaseQuantity,
    removeProduct,
    clearCart,
    totalQuantity,
    subtotal,
  };
}

export type CartController = ReturnType<typeof useCart>;
