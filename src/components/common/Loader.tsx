import "./feedback.css";

export function Loader() {
  return (
    <div className="catalog-feedback" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>Cargando productos…</p>
      <small>Estamos consultando el catálogo de DummyJSON.</small>
    </div>
  );
}
