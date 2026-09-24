import { Button } from "./Button";
import "./feedback.css";

// Mostramos el motivo del error y avisamos al componente padre al pulsar Reintentar.
// La consulta a la API se hace en useProducts, no dentro de este mensaje.
export function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="catalog-feedback catalog-feedback--error">
      {/* El lector de pantalla anuncia el error sin que haya que buscarlo. */}
      <div role="alert">
        <h3>No pudimos mostrar los productos</h3>
        <p>{message}</p>
      </div>
      <Button onClick={onRetry}>Reintentar</Button>
    </div>
  );
}
