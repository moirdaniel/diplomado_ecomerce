import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";

export type ProductSort = "default" | "price-asc" | "price-desc" | "name";

// Los valores llegan desde ProductCatalog y las callbacks devuelven los cambios.
// Así la búsqueda, la categoría y el orden siempre usan el mismo estado.
interface ProductFiltersProps {
  search: string;
  category: string;
  categories: string[];
  sort: ProductSort;
  onSearch: (value: string) => void;
  onCategory: (category: string) => void;
  onSort: (sort: ProductSort) => void;
}

export function ProductFilters({
  search,
  category,
  categories,
  sort,
  onSearch,
  onCategory,
  onSort,
}: ProductFiltersProps) {
  return (
    <div className="product-filters">
      <div
        className="categories"
        role="group"
        aria-label="Filtrar por categoría"
      >
        {["", ...categories].map((value) => (
          <Button
            key={value}
            variant={category === value ? "primary" : "secondary"}
            aria-pressed={category === value}
            onClick={() => onCategory(value)}
          >
            {value ? value.replaceAll("-", " ") : "Todos"}
          </Button>
        ))}
      </div>
      <div className="search-sort">
        <SearchBar value={search} onChange={onSearch} />
        <label className="sort-label">
          Ordenar por
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value as ProductSort)}
          >
            <option value="default">Recomendados</option>
            <option value="price-asc">Precio menor a mayor</option>
            <option value="price-desc">Precio mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}
