import type { CartItem } from "../types/Cart";
import type { Order } from "../types/Order";
import type { Product } from "../types/Product";

export const getProductPrice = (product: Product): number =>
  product.price.sale ?? product.price.regular;

/** El precio publicado ya incluye IVA: se desglosa, nunca se suma otra vez. */
export const calculateIncludedTax = (total: number) => {

  const subtotal = Math.round(total / 1.19);

  // Calculamos el IVA por diferencia para que, incluso al redondear
  // a pesos enteros, neto + IVA coincida exactamente con el total.
  return { subtotal, tax: total - subtotal, total };
};

/** Copia solo los datos necesarios de cada producto para congelar la compra. */
export const createOrder = (cart: CartItem[]): Order => {
  if (cart.length === 0) throw new Error("El carrito está vacío.");
  const items = cart.map(({ product, quantity }) => {
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > product.stock
    ) {
      throw new Error("Cantidad inválida para " + product.name);
    }
    const unitPrice = getProductPrice(product);
    return {
      productId: product.id,
      name: product.name,
      unitPrice,
      quantity,
      subtotal: unitPrice * quantity,
    };
  });
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  return {
    id: "MG-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
    items,
    ...calculateIncludedTax(total),
    status: "pending",
    createdAt: new Date(),
  };
};
