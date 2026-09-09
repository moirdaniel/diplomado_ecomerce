interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Es un campo controlado: value muestra el texto del padre y onChange
// le entrega el nuevo texto. La búsqueda de productos se hace fuera de aquí.
export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar productos…",
}: SearchBarProps) {
  return (
    <label className="search-bar">
      {/* La etiqueta sigue disponible para lectores de pantalla al escribir. */}
      <span className="sr-only">Buscar productos</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
