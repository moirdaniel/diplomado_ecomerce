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
      <label className="sort-label category-select">
        Categoría
        <select
          value={category}
          onChange={(event) => onCategory(event.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value.replaceAll("-", " ")}
            </option>
          ))}
        </select>
      </label>
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
