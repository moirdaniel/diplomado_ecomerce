import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { parseProductsResponse, PRODUCTS_URL } from "../services/products";

// App usa este hook una sola vez: catálogo y destacados comparten la respuesta,
// y volver desde el checkout no descarga de nuevo ni reemplaza el carrito.
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15000);

    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_URL, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(
            `No se pudo cargar el catálogo (HTTP ${response.status}).`,
          );
        const data: unknown = await response.json();
        const result = parseProductsResponse(data);
        if (!cancelled) {
          setProducts(result.products);
          setTotal(result.total);
        }
      } catch (reason: unknown) {
        if (!cancelled) {
          setError(
            timedOut
              ? "La API tardó demasiado en responder. Intenta nuevamente."
              : reason instanceof TypeError
                ? "No pudimos conectar con la API. Revisa tu conexión e intenta nuevamente."
                : reason instanceof Error
                  ? reason.message
                  : "No se pudo cargar el catálogo.",
          );
        }
      } finally {
        window.clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    }
    void loadProducts();
    // También evita que una respuesta anterior sobrescriba una consulta nueva.
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  const retry = () => {
    setError(null);
    setProducts([]);
    setTotal(0);
    setLoading(true);
    setAttempt((current) => current + 1);
  };
  return { products, loading, error, total, retry };
}
export type ProductsController = ReturnType<typeof useProducts>;
