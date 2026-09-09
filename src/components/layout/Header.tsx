import { Button } from "../common/Button";
import { CartIcon } from "../common/CartIcon";
import { Navbar } from "./Navbar";
import "./layout.css";

// count llega del carrito compartido. busy impide abandonar la compra
// mientras se muestra la simulación; App decide cuándo activar ese bloqueo.
interface HeaderProps {
  count: number;
  onHome: () => void;
  onCatalog: () => void;
  onCart: () => void;
  busy: boolean;
}

export function Header({
  count,
  onHome,
  onCatalog,
  onCart,
  busy,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-content">
        <a
          href="#inicio"
          className="brand"
          onClick={(event) => {
            // App se encarga de cambiar de página y enfocar la sección.
            // Evitamos que el enlace haga un salto independiente por su cuenta.
            event.preventDefault();
            if (!busy) onHome();
          }}
        >
          MOIR <span>GAMES</span>
        </a>
        <Navbar onHome={onHome} onCatalog={onCatalog} disabled={busy} />
        <Button
          variant="secondary"
          onClick={onCart}
          disabled={busy}
          aria-label={`Ver carrito, ${count} productos`}
        >
          <CartIcon /> Carrito <span className="cart-count">{count}</span>
        </Button>
        {/* Anuncia las nuevas cantidades sin mover el foco del botón pulsado. */}
        <span className="sr-only" role="status">
          {count}{" "}
          {count === 1 ? "producto en el carrito" : "productos en el carrito"}
        </span>
      </div>
    </header>
  );
}
