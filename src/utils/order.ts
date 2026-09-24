import type { CartItem } from "../types/Cart";
import type { Order } from "../types/Order";
import type { Product } from "../types/Product";

export const getProductPrice = (product: Product): number =>
  product.price;

  // asumimos un IVA incluido del 19%; no es información fiscal de la API.
export const calculateIncludedTax = (total: number) => {
  total = Math.round(total * 100) / 100;
  const subtotal = Math.round((total / 1.19) * 100) / 100;

  // Calculamos el IVA por diferencia para que, incluso al redondear
  // a centavos, neto + IVA coincida exactamente con el total.
  return { subtotal, tax: Math.round((total - subtotal) * 100) / 100, total };
};

  // Copia solo los datos necesarios de cada producto para congelar la compra.
export const createOrder = (cart: CartItem[]): Order => {

  if (cart.length === 0)
    throw new Error("El carrito está vacío.");

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
      subtotal: Math.round(unitPrice * quantity * 100) / 100,
    };

  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    id: "MM-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
    items,
    ...calculateIncludedTax(total),
    status: "pending",
    createdAt: new Date(),
  };

};
