import type { ReactNode } from "react";

// Contenedor de composición: sus hijos definen encabezado, líneas y totales.
export function Receipt({ children }: { children: ReactNode }) {
  return (
    <article className="receipt" aria-label="Boleta simulada">
      {children}
    </article>
  );
}
