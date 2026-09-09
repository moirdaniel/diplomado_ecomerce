import type { Product } from "./Product";

// Un artículo del carrito une un producto con la cantidad elegida.
// No duplicamos el producto para representar varias unidades.
export interface CartItem {
  product: Product;
  quantity: number;
}
