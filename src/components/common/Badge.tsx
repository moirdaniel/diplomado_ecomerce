import type { ReactNode } from "react";

// Etiqueta pequeña para destacar un texto. El catálogo actual no la utiliza.
export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}
