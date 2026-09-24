import { useState } from "react";
import type { ProductsController } from "../../hooks/useProducts";
import { Loader } from "../common/Loader";
import { ErrorMessage } from "../common/ErrorMessage";
import type { CartController } from "../../hooks/useCart";
import { getProductPrice } from "../../utils/order";
import { ProductFilters } from "./ProductFilters";
import type { ProductSort } from "./ProductFilters";
import { ProductList } from "./ProductList";

// Los filtros pertenecen al catálogo y no afectan a los destacados.
export function ProductCatalog({
  cart,
  catalog,
}: {
  cart: CartController;
  catalog: ProductsController;
}) {
  const [search, setSearch] = useState<string>("");

  const [category, setCategory] = useState("");
  const { products, loading, error, total, retry } = catalog;
  const categories = [...new Set(products.map((product) => product.category))];

  const [sort, setSort] = useState<ProductSort>("default");

  // La lista visible se calcula desde los filtros: no hace falta guardar
  // otra copia en estado ni sincronizarla con useEffect.
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLocaleLowerCase("es")
        .includes(search.trim().toLocaleLowerCase("es")) &&
      (!category || product.category === category),
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
      {!loading && !error && (
        <ProductFilters
          search={search}
          category={category}
          categories={categories}
          sort={sort}
          onSearch={setSearch}
          onCategory={setCategory}
          onSort={setSort}
        />
      )}
      <div className="section-heading">
        <h2 id="catalog-title">Explora el catálogo</h2>
        {!loading && !error && (
          <span role="status">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </span>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <>
          <p className="catalog-note">
            Búsqueda en los {products.length} productos cargados de {total}{" "}
            disponibles. Precios de demostración en USD, sin conversión.
          </p>
          <ProductList
            products={filteredProducts}
            cartItems={cart.items}
            onAdd={cart.addProduct}
          />
        </>
      )}
    </section>
  );
}
