// Producto utilizado por la interfaz; la respuesta de la API se adapta en services/products.
export interface Product {
  id: number;
  name: string;
  description: string;
  // Precio recibido de la API, sin símbolos ni conversión de moneda.
  price: number;
  image: string;
  // Nombre visible de la categoría, incluido en los datos de cada producto.
  category: string;
  // Límite por carrito en esta demo; no hay inventario compartido entre compras.
  stock: number;
}
