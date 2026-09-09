import type { CartItem as CartItemModel } from "../../types/Cart";
import type { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/currency";
import { getProductPrice } from "../../utils/order";
import { Button } from "../common/Button";

// Las callbacks permiten avisar al padre sin modificar las props.
// Para aumentar enviamos el producto; para disminuir o eliminar basta su ID.
interface CartItemProps {
  item: CartItemModel;
  onIncrease: (product: Product) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({
  item: { product, quantity },
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <li className="cart-item">
      {/* El nombre ya está en el encabezado; alt vacío evita leerlo dos veces. */}
      <img src={product.image} alt="" width="56" height="56" />
      <div className="cart-item-content">
        <h3>{product.name}</h3>
        <p>{formatCurrency(getProductPrice(product))} c/u</p>
        <div className="quantity-controls">
          <Button
            variant="secondary"
            aria-label={`Disminuir ${product.name}`}
            onClick={() => onDecrease(product.id)}
          >
            −
          </Button>
          <span aria-label={`Cantidad de ${product.name}: ${quantity}`}>
            {quantity}
          </span>
          <Button
            variant="secondary"
            aria-label={`Aumentar ${product.name}`}
            disabled={quantity >= product.stock}
            onClick={() => onIncrease(product)}
          >
            +
          </Button>
        </div>
        <div className="cart-item-bottom">
          <strong>{formatCurrency(getProductPrice(product) * quantity)}</strong>
          <Button
            variant="danger"
            onClick={() => onRemove(product.id)}
            aria-label={`Eliminar ${product.name}`}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </li>
  );
}
