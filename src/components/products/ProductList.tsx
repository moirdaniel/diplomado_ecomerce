import type { Product } from "../../types/Product";
import type { CartItem } from "../../types/Cart";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
}

// La grilla presenta la lista que recibe, tanto filtrada como destacada.
// Cada tarjeta conoce su cantidad en el carrito para respetar el stock.
export function ProductList({ products, cartItems, onAdd }: ProductListProps) {
  if (products.length === 0)
    return (
      <p className="empty-state">
        No encontramos productos. Prueba otra búsqueda o categoría.
      </p>
    );
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          quantityInCart={
            cartItems.find((item) => item.product.id === product.id)
              ?.quantity ?? 0
          }
        />
      ))}
    </div>
  );
}
