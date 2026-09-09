import { Button } from "../common/Button";

interface NavbarProps {
  onHome: () => void;
  onCatalog: () => void;
  disabled: boolean;
}

// La barra solo comunica qué acción se pulsó. No necesita conocer
// el carrito ni cómo App cambia entre la tienda y el checkout.
export function Navbar({ onHome, onCatalog, disabled }: NavbarProps) {
  return (
    <nav aria-label="Navegación principal">
      <Button variant="secondary" onClick={onHome} disabled={disabled}>
        Inicio
      </Button>
      <Button variant="secondary" onClick={onCatalog} disabled={disabled}>
        Catálogo
      </Button>
    </nav>
  );
}
