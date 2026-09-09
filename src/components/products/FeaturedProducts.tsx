import type { CartController } from "../../hooks/useCart";
import { products } from "../../data/products";
import { ProductGrid } from "./ProductGrid";

// Reutilizamos la misma grilla y las mismas acciones del catálogo.
// Agregar desde destacados también actualiza el carrito compartido.
export function FeaturedProducts({ cart }: { cart: CartController }) {
  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <div className="section-heading">
        <h2 id="featured-title">Productos destacados</h2>
        <span>Para tu próxima partida</span>
      </div>
      <ProductGrid
        products={products.filter((product) => product.featured)}
        cartItems={cart.items}
        onAdd={cart.addProduct}
      />
    </section>
  );
}
