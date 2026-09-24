import type { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/currency";
import { getProductPrice } from "../../utils/order";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import "./products.css";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
}

export function ProductCard({
  product,
  quantityInCart,
  onAdd,
}: ProductCardProps) {
  const isOnSale =
    product.price.sale !== undefined &&
    product.price.sale < product.price.regular;
  // El límite visual evita ofrecer más unidades que las disponibles.
  // useCart vuelve a comprobarlo para proteger también la lógica.
  const atLimit = quantityInCart >= product.stock;
  return (
    <article className="product-card">
      <div
        className={`product-art product-art--${product.imagePresentation ?? "product"}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width="400"
          height="300"
        />
        {isOnSale && <Badge>Oferta</Badge>}
      </div>
      <div className="product-content">
        {product.platform && <p className="platform">{product.platform}</p>}
        <p className="product-category">Categoría: {product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className={product.stock ? "stock" : "stock stock--empty"}>
          {product.stock
            ? `${product.stock} ${product.stock === 1 ? "disponible" : "disponibles"}`
            : "Sin stock"}
        </p>
        <div className="price">
          <strong>{formatCurrency(getProductPrice(product))}</strong>
          {isOnSale && <del>{formatCurrency(product.price.regular)}</del>}
        </div>
        <Button disabled={atLimit} onClick={() => onAdd(product)}>
          {!product.stock
            ? "Agotado"
            : atLimit
              ? "Máximo en carrito"
              : "Agregar al carrito"}
        </Button>
      </div>
    </article>
  );
}
