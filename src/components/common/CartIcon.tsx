import cartIcon from "../../assets/icons/cart.svg";

// El dibujo está en un archivo aparte. El texto del botón o del panel
// ya explica su función, por eso la imagen no repite una descripción.
export function CartIcon() {
  return (
    <img
      src={cartIcon}
      alt=""
      className="cart-icon"
      width="22"
      height="22"
    />
  );
}
