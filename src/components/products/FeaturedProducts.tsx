import type { CartController } from "../../hooks/useCart";
import type { Product } from "../../types/Product";
import { ProductList } from "./ProductList";

// Reutilizamos la misma grilla y las mismas acciones del catálogo.
// Agregar desde destacados también actualiza el carrito compartido.
export function FeaturedProducts({
  cart,
  products,
}: {
  cart: CartController;
  products: Product[];
}) {
  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <div className="section-heading">
        <h2 id="featured-title">Productos destacados</h2>
        <span>Selección del catálogo</span>
      </div>
      <ProductList
        products={products}
        cartItems={cart.items}
        onAdd={cart.addProduct}
      />
    </section>
  );
}
