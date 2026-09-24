import { useEffect, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import "./styles/global.css";

type Page = "store" | "checkout";

// App conserva el carrito y decide qué página mostrar. Las páginas reciben
// datos y acciones por props; no crean carritos independientes.
export default function App() {
  const cart = useCart();
  const catalog = useProducts();
  const [page, setPage] = useState<Page>("store");
  const [busy, setBusy] = useState(false);
  const [section, setSection] = useState("inicio");

  // Al cambiar de vista, llevamos el foco al contenido para facilitar
  // la navegación con teclado y evitar que la pantalla quede abajo.
  useEffect(() => {
    const target = document.getElementById(
      page === "checkout" ? "main-content" : section,
    );

    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "start" });
  }, [page, section]);

  const navigate = (target: string) => {
    setPage("store");
    setSection(target);

    // Si se pulsa otra vez la misma sección, el estado no cambia.
    // Por eso repetimos aquí el desplazamiento que haría el efecto.
    if (page === "store" && section === target) {
      const element = document.getElementById(target);
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ block: "start" });
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <Header
        count={cart.totalQuantity}
        busy={busy}
        onHome={() => navigate("inicio")}
        onCatalog={() => navigate("catalogo")}
        onCart={() => navigate("carrito")}
      />
      <main id="main-content" tabIndex={-1}>
        {page === "store" ? (
          <HomePage
            catalog={catalog}
            cart={cart}
            onCheckout={() => setPage("checkout")}
          />
        ) : (
          <CheckoutPage
            cart={cart}
            onBack={() => navigate("catalogo")}
            onBusy={setBusy}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
