import type { ProductsController } from "../hooks/useProducts";
import type { CartController } from "../hooks/useCart";
import { Cart } from "../components/cart/Cart";
import { ProductCatalog } from "../components/products/ProductCatalog";
import { FeaturedProducts } from "../components/products/FeaturedProducts";

interface HomePageProps {
  catalog: ProductsController;
  cart: CartController;
  onCheckout: () => void;
}

// Esta página reúne las secciones de la tienda. El carrito llega desde App
// para que catálogo, destacados y resumen trabajen con la misma compra.
export function HomePage({ cart, onCheckout, catalog }: HomePageProps) {
  return (
    <div className="store-layout">
      <div className="store-content">
        <section className="intro" id="inicio" tabIndex={-1}>
          <h1>Descubre tu próximo favorito.</h1>
          <p>
            Explora productos de distintas categorías, ahora desde DummyJSON.
          </p>
        </section>
        <ProductCatalog cart={cart} catalog={catalog} />
        {!catalog.loading && !catalog.error && catalog.products.length > 0 && (
          <FeaturedProducts
            cart={cart}
            products={catalog.products.slice(0, 3)}
          />
        )}
      </div>
      <Cart cart={cart} onCheckout={onCheckout} />
    </div>
  );
}
