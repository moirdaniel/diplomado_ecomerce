import { useState } from "react";
import { products } from "../../data/products";
import type { CartController } from "../../hooks/useCart";
import { getProductPrice } from "../../utils/order";
import { ProductFilters } from "./ProductFilters";
import type { ProductSort } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

// Los filtros pertenecen al catálogo y no afectan a los destacados.
export function ProductCatalog({ cart }: { cart: CartController }) {

  const [search, setSearch] = useState<string>("");

  const [categoryId, setCategoryId] = useState<number>(0);

  const [sort, setSort] = useState<ProductSort>("default");

  // La lista visible se calcula desde los filtros: no hace falta guardar
  // otra copia en estado ni sincronizarla con useEffect.
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLocaleLowerCase("es")
        .includes(search.trim().toLocaleLowerCase("es")) &&
      (categoryId === 0 || product.categoryId === categoryId),
  );

  // filter crea un arreglo nuevo; sort no modifica el catálogo mock original.
  if (sort === "price-asc")
    filteredProducts.sort((a, b) => getProductPrice(a) - getProductPrice(b));
  if (sort === "price-desc")
    filteredProducts.sort((a, b) => getProductPrice(b) - getProductPrice(a));
  if (sort === "name")
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name, "es"));

  return (
    <section id="catalogo" tabIndex={-1} aria-labelledby="catalog-title">
      <ProductFilters
        search={search}
        categoryId={categoryId}
        sort={sort}
        onSearch={setSearch}
        onCategory={setCategoryId}
        onSort={setSort}
      />
      <div className="section-heading">
        <h2 id="catalog-title">Explora el catálogo</h2>
        <span role="status">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "producto" : "productos"}
        </span>
      </div>
      <ProductGrid
        products={filteredProducts}
        cartItems={cart.items}
        onAdd={cart.addProduct}
      />
    </section>
  );
}
