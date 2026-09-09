import type { CartController } from "../hooks/useCart";
import { Cart } from "../components/cart/Cart";
import { ProductCatalog } from "../components/products/ProductCatalog";
import { FeaturedProducts } from "../components/products/FeaturedProducts";

interface HomePageProps {
  cart: CartController;
  onCheckout: () => void;
}

// Esta página reúne las secciones de la tienda. El carrito llega desde App
// para que catálogo, destacados y resumen trabajen con la misma compra.
export function HomePage({ cart, onCheckout }: HomePageProps) {
  return (
    <div className="store-layout">
      <div className="store-content">
        <section className="intro" id="inicio" tabIndex={-1}>
          <h1>Tu próxima partida empieza aquí.</h1>
          <p>Juegos, consolas y accesorios para tu mundo gamer.</p>
        </section>
        <ProductCatalog cart={cart} />
        <FeaturedProducts cart={cart} />
      </div>
      <Cart cart={cart} onCheckout={onCheckout} />
    </div>
  );
}
