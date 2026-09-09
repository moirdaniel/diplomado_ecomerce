import { categories } from "../../data/categories";
import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";

export type ProductSort = "default" | "price-asc" | "price-desc" | "name";

// Los valores llegan desde ProductCatalog y las callbacks devuelven los cambios.
// Así la búsqueda, la categoría y el orden siempre usan el mismo estado.
interface ProductFiltersProps {
  search: string;
  categoryId: number;
  sort: ProductSort;
  onSearch: (value: string) => void;
  onCategory: (id: number) => void;
  onSort: (sort: ProductSort) => void;
}

export function ProductFilters({
  search,
  categoryId,
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
        {/* El ID 0 representa «Todos»; no es una categoría del catálogo. */}
        {[{ id: 0, name: "Todos" }, ...categories].map((category) => (
          <Button
            key={category.id}
            variant={categoryId === category.id ? "primary" : "secondary"}
            aria-pressed={categoryId === category.id}
            onClick={() => onCategory(category.id)}
          >
            {category.name}
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
