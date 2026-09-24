import { Button } from "./Button";
import "./pagination.css";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  // No necesitamos botones para cambiar de página si todos los resultados caben en una.
  if (pageCount <= 1) return null;

  // Extremos y páginas cercanas: evitamos una fila enorme de botones en móvil.
  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  ).filter(
    (number) =>
      number === 1 || number === pageCount || Math.abs(number - page) <= 1,
  );

  return (
    <nav className="pagination" aria-label="Paginación de productos">
      <p role="status">
        Página {page} de {pageCount}
      </p>
      <div className="pagination-controls">
        {/* En la primera página no se puede retroceder. */}
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>
        <div className="pagination-numbers">
          {pages.map((number, index) => (
            <span className="pagination-item" key={number}>
              {/* Los puntos indican que hay páginas intermedias que no mostramos aquí. */}
              {index > 0 && number - pages[index - 1] > 1 && (
                <span aria-hidden="true">…</span>
              )}
              {/* aria-current permite que un lector de pantalla reconozca la página actual. */}
              <Button
                variant={page === number ? "primary" : "secondary"}
                aria-label={`Ir a página ${number}`}
                aria-current={page === number ? "page" : undefined}
                onClick={() => onPageChange(number)}
              >
                {number}
              </Button>
            </span>
          ))}
        </div>
        {/* En la última página no se puede avanzar más. */}
        <Button
          variant="secondary"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </nav>
  );
}
