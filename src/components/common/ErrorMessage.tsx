import { Button } from "./Button";
import "./feedback.css";

export function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="catalog-feedback catalog-feedback--error">
      <div role="alert">
        <h3>No pudimos mostrar los productos</h3>
        <p>{message}</p>
      </div>
      <Button onClick={onRetry}>Reintentar</Button>
    </div>
  );
}
