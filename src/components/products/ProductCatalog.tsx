import { useState } from "react";
import type { ProductsController } from "../../hooks/useProducts";
import { Loader } from "../common/Loader";
import { ErrorMessage } from "../common/ErrorMessage";
import type { CartController } from "../../hooks/useCart";
import { getProductPrice } from "../../utils/order";
import { ProductFilters } from "./ProductFilters";
import type { ProductSort } from "./ProductFilters";
import { ProductList } from "./ProductList";
import { Pagination } from "../common/Pagination";

// Los filtros pertenecen al catálogo y no afectan a los destacados.
export function ProductCatalog({
  cart,
  catalog,
}: {
  cart: CartController;
  catalog: ProductsController;
}) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [category, setCategory] = useState("");
  const { products, loading, error, retry } = catalog;
  // Set elimina las categorías repetidas: cada opción aparece una sola vez.
  const categories = [...new Set(products.map((product) => product.category))];

  const [sort, setSort] = useState<ProductSort>("default");

  // Buscamos sin distinguir mayúsculas y quitamos los espacios de los extremos.
  // Si no se eligió una categoría, dejamos pasar productos de todas ellas.
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLocaleLowerCase("es")
        .includes(search.trim().toLocaleLowerCase("es")) &&
      (!category || product.category === category),
  );

  // filter crea un arreglo nuevo; sort no modifica el catálogo original.
  if (sort === "price-asc")
    filteredProducts.sort((a, b) => getProductPrice(a) - getProductPrice(b));
  if (sort === "price-desc")
    filteredProducts.sort((a, b) => getProductPrice(b) - getProductPrice(a));
  if (sort === "name")
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name, "es"));

  // Filtramos y ordenamos antes de extraer la página: los filtros son globales.
  // Redondeamos hacia arriba: 25 productos necesitan 3 páginas de 12.
  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  // Evitamos quedar en una página que ya no existe si hay menos resultados.
  const currentPage = Math.min(page, Math.max(1, pageCount));
  // La página 2 empieza en la posición 12, porque el arreglo comienza en 0.
  // slice toma solo los productos de esa página sin cambiar el arreglo original.
  const start = (currentPage - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(start, start + pageSize);

  const changePage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, pageCount)));
    // Volvemos al título para que la persona vea dónde comienza la nueva página.
    // Mover el foco también ayuda a quienes navegan con teclado.
    const title = document.getElementById("catalog-title");
    title?.focus({ preventScroll: true });
    title?.scrollIntoView({ block: "start" });
  };

  return (
    <section id="catalogo" tabIndex={-1} aria-labelledby="catalog-title">
      {!loading && !error && (
        // Un filtro nuevo puede tener pocas coincidencias; empezamos en la página 1.
        <ProductFilters
          search={search}
          category={category}
          categories={categories}
          sort={sort}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onCategory={(value) => {
            setCategory(value);
            setPage(1);
          }}
          onSort={(value) => {
            setSort(value);
            setPage(1);
          }}
        />
      )}
      <div className="section-heading">
        <h2 id="catalog-title" tabIndex={-1}>
          Explora el catálogo
        </h2>
        {!loading && !error && (
          <span role="status">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </span>
        )}
      </div>
      {/* Mientras esperamos mostramos la carga; si falla, el error; si resulta, la lista. */}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <>
          <p className="catalog-note">
            {filteredProducts.length > 0
              ? `Mostrando ${start + 1}–${start + visibleProducts.length} de ${filteredProducts.length} productos.`
              : "Sin productos para estos filtros."}{" "}
            Precios de demostración en USD, sin conversión.
          </p>
          <ProductList
            products={visibleProducts}
            cartItems={cart.items}
            onAdd={cart.addProduct}
          />
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={changePage}
          />
        </>
      )}
    </section>
  );
}
