import type { Product } from "../types/Product";

// limit=0 permite buscar y ordenar todo el catálogo antes de paginar en React.
export const PRODUCTS_URL = "https://dummyjson.com/products?limit=0";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Aunque usamos TypeScript, la API puede enviar datos incompletos.
// Revisamos que tenga una lista de productos y los datos necesarios para mostrarlos.
export function parseProductsResponse(value: unknown): {
  products: Product[];
  total: number;
} {
  if (
    !isRecord(value) ||
    !Array.isArray(value.products) ||
    typeof value.total !== "number" ||
    !Number.isInteger(value.total) ||
    value.total < value.products.length
  ) {
    throw new Error("La API devolvió un formato de catálogo inesperado.");
  }
  // Guardamos los identificadores que ya vimos para detectar productos repetidos.
  const ids = new Set<number>();
  const products = value.products.map((item: unknown): Product => {
    if (
      !isRecord(item) ||
      typeof item.id !== "number" ||
      !Number.isInteger(item.id) ||
      ids.has(item.id) ||
      typeof item.title !== "string" ||
      !item.title.trim() ||
      typeof item.category !== "string" ||
      !item.category.trim() ||
      typeof item.price !== "number" ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      typeof item.stock !== "number" ||
      !Number.isInteger(item.stock) ||
      item.stock < 0 ||
      typeof item.thumbnail !== "string" ||
      !/^https?:\/\//.test(item.thumbnail)
    ) {
      throw new Error("La API devolvió un producto con datos incompletos.");
    }
    ids.add(item.id);
    // La API llama title al nombre y thumbnail a la imagen.
    // Aquí usamos los nombres de nuestra aplicación para reutilizar sus componentes.
    return {
      id: item.id,
      name: item.title,
      description: typeof item.description === "string" ? item.description : "",
      category: item.category,
      price: { regular: item.price },
      stock: item.stock,
      image: item.thumbnail,
    };
  });
  return { products, total: value.total };
}
