# Moir Games — Evaluación 2

Proyecto académico del diplomado Full Stack Developer. Tienda de videojuegos, consolas y accesorios orientada a demostrar **componentes reutilizables, props, estado y composición en React con TypeScript**.

15 productos mock, seis categorías y tres medios de pago simulados. La aplicación utiliza datos e imágenes locales y no depende de backend, base de datos ni APIs externas.

## Ejecutar

Requisitos: Node.js 22.12 o superior. Verificado con Node.js 24.16 y npm 11.

```bash
npm install
npm run dev
```

Abre la dirección que indique Vite, normalmente http://localhost:5173. Para instalar exactamente las versiones del lockfile después de clonar, usa `npm ci`.

```bash
npm run lint
npm run build
npm run preview
```

Build valida TypeScript y crea `dist/`; preview permite revisar esa compilación localmente. No se requieren variables de entorno ni credenciales.

## Tecnologías

React 19, React DOM, TypeScript 6 estricto, Vite 8, CSS tradicional por componentes, ESLint 10.

Se usa estado para navegar entre tienda y checkout. React Router no aporta valor a este ejercicio de dos vistas sin enlaces profundos. No se utiliza Redux ni librerías de animación.

## Funcionalidades

- Catálogo, destacados y búsqueda controlada por nombre.
- Filtros Todos, PlayStation, Xbox, Nintendo, PC Gaming, Retro Gaming y Accesorios.
- Orden por precio efectivo ascendente, descendente y nombre A-Z.
- Precios regulares/ofertas en CLP, badges y stock.
- Carrito: agregar, aumentar, disminuir, eliminar, vaciar y contador global.
- Límites de stock en botones y hook. Disminuir de una unidad a cero elimina la fila.
- Checkout con neto, IVA incluido y total.
- Crédito, débito o Webpay simulados, sin solicitar datos bancarios.
- Orden independiente del carrito y fecha dinámica.
- Impresora CSS con procesamiento, impresión y finalización.
- Boleta compuesta, impresión desde el navegador y reinicio mediante Volver a comprar.
- Responsive, etiquetas accesibles, foco visible y movimiento reducido.

## Organización de carpetas

```text
config/             Configuración de TypeScript para aplicación y herramientas
src/                Código de la aplicación y fotos de productos
```

`node_modules/` contiene dependencias instaladas y `dist/` la compilación generada; Git las ignora. En la raíz se conservan el README, los archivos de npm, `index.html` y los puntos de entrada de configuración de Vite, ESLint y TypeScript. Los comandos de ejecución se lanzan desde la raíz.

## Arquitectura

```text
src/
├── assets/
│   ├── icons/              # Iconos SVG referenciados como imágenes
│   └── images/products/    # Fotos y portadas locales
├── components/
│   ├── common/              # Button, Badge, SearchBar, CartIcon
│   ├── layout/              # Header, Navbar, Footer y CSS
│   ├── products/            # ProductCatalog, FeaturedProducts,
│   │                        # ProductFilters, ProductGrid, ProductCard y CSS
│   ├── cart/                # Cart, CartItem, CartSummary y CSS
│   └── checkout/            # Checkout, CheckoutSummary, ReceiptPrinter,
│       │                    # PaymentStatus y CSS
│       └── receipt/         # Receipt, ReceiptHeader, ReceiptItem, ReceiptTotals
├── data/                    # Catálogo, categorías y medios de pago
├── hooks/                   # useCart: estado y acciones de la compra
├── pages/                   # HomePage y CheckoutPage
├── styles/                  # Estilos generales
├── types/                   # Contratos de datos compartidos
├── utils/                   # Formato de moneda y creación de órdenes
├── App.tsx                  # Carrito compartido y navegación
└── main.tsx                 # Montaje con StrictMode
```

HomePage compone la tienda completa: introducción, catálogo, destacados y carrito. CheckoutPage coordina la confirmación y el resultado de la compra.


## Cómo recorrer el código

1. `App.tsx` crea un único carrito y elige entre HomePage y CheckoutPage.
2. `HomePage` reúne las secciones de la tienda. ProductCatalog mantiene sus filtros; FeaturedProducts selecciona los destacados. Ambos reutilizan ProductGrid y ProductCard.
3. `useCart` concentra las cantidades, los límites de stock y los totales. Los componentes llaman a sus acciones mediante props.
4. `CheckoutPage` crea una orden independiente y activa ReceiptPrinter. El formulario Checkout recoge el medio de pago simulado.
5. `ReceiptPrinter` controla las etapas de la simulación. Los componentes de `checkout/receipt` presentan el comprobante y sus partes.

Los comentarios explican por qué se usa el estado más reciente del carrito, por qué los totales se calculan al renderizar y por qué se limpian los temporizadores. Los nombres describen la responsabilidad de cada componente. Se mantienen imports directos para seguir fácilmente el recorrido de los datos.

## Conceptos aplicados

| Concepto | Ejemplo |
| --- | --- |
| Componentes | ProductCard presenta un producto. |
| Reutilización | Button ofrece variantes primary, secondary y danger. |
| Props | ProductCard recibe product, quantityInCart y onAdd. |
| Estado | useCart mantiene CartItem[] mediante useState. |
| Objetos | Cada elemento de products es un objeto Product. |
| Interfaces | Product, Category, ProductPrice, CartItem, OrderItem, Order, Payment. |
| Union types | Platform, OrderStatus, ReceiptPrinterStage, PaymentMethod, PaymentStatus. |
| Listas | ProductGrid usa map con product.id como key. |
| Condicionales | Carrito vacío, productos agotados, ofertas y compra completada. |
| Composición | Receipt recibe ReceiptHeader, ReceiptItem[] y ReceiptTotals como children. |
| Eventos | onClick agrega productos, onChange cambia filtros y onSubmit confirma. |
| Inmutabilidad | map, filter y spread crean un nuevo carrito. |
| Valores derivados | Contador, totales, productos filtrados y estado visible de pago. |
| Efectos | ReceiptPrinter programa y limpia temporizadores con useEffect. |

## Estados React

- useCart: items.
- App: page (tienda/checkout), busy (bloqueo durante la compra), section (destino de navegación).
- ProductCatalog: search, categoryId y sort.
- Checkout: método de pago seleccionado.
- CheckoutPage: purchase (Order y Payment).
- ReceiptPrinter: stage.

Totales y listas filtradas se calculan desde estos estados, evitando copias innecesarias.

## Carrito y órdenes

useCart es la única fuente del carrito. Se ejecuta una vez en App; datos y callbacks viajan mediante props. Agregar un producto existente aumenta su cantidad hasta el stock disponible. Las actualizaciones funcionales evitan perder cambios ante clics rápidos.

createOrder rechaza un carrito vacío o cantidades inválidas y transforma CartItem[] en OrderItem[]. Copia nombre, precio unitario, cantidad y subtotal; cambios posteriores en Product no alteran el comprobante. El ID se genera con crypto.randomUUID() y la fecha con new Date().

## IVA incluido y formato CLP

Los precios publicados son finales. Para Zelda ($49.990) + Mario ($39.990):

```text
Total = 49.990 + 39.990 = 89.980
Neto  = round(89.980 / 1,19) = 75.613
IVA   = 89.980 - 75.613 = 14.367
Neto + IVA = 89.980
```

calculateIncludedTax redondea a pesos enteros y calcula IVA por diferencia para conservar el total. No agrega otro 19%. Order.subtotal es el neto; OrderItem.subtotal y useCart.subtotal son importes de productos con IVA incluido. formatCurrency centraliza Intl.NumberFormat con es-CL/CLP.

## Flujo y composición

```text
Catálogo → carrito → checkout → confirmar compra simulada
→ processing (1,2 s) → printing (2 s) → complete → boleta
→ Volver a comprar → carrito vacío y catálogo
```

Al confirmar se crea la orden y se bloquea la navegación. ReceiptPrinter deriva Order.status (processing, printing, completed) y Payment.status (pending, approved) de stage. Todos los pagos se aprueban en la demo; rejected pertenece al modelo pero no se simula una pasarela real.

Dos setTimeout cambian los estados y se cancelan al desmontar. La animación feed-paper mueve el papel desde la ranura y respeta prefers-reduced-motion.

```tsx
<Receipt>
  <ReceiptHeader order={order} />
  {order.items.map(item => (
    <ReceiptItem key={item.productId} item={item} />
  ))}
  <ReceiptTotals order={order} />
</Receipt>
```

La boleta es un comprobante de una compra simulada, sin validez tributaria. Imprimir boleta abre la impresión del navegador con estilos de papel de 80 mm. No controla hardware ni emite documentos tributarios.

## Alcance y recursos

- Datos, precios y stock ficticios; no representan disponibilidad comercial.
- El stock limita cada carrito, pero no se descuenta de inventario entre compras.
- Recargar reinicia la demo. No hay persistencia, cuentas, despachos ni historial.
- El catálogo usa 15 fotografías y portadas descargadas desde sitios oficiales y guardadas localmente. Las fuentes se indican al final de este README.
- Inspiración conceptual de la impresora: [Receipt Printer de dqnamo](https://www.dqnamo.com/experiments/receipt-printer). Implementación propia con React y CSS, sin copiar su código.

## Imágenes

Las fotos y portadas se guardan dentro de `src/assets/images/products/`. Pertenecen a sus respectivos titulares; no se declara una licencia libre de reproducción. Se utilizan como referencia en este proyecto académico, con precios y stock ficticios.

| Producto o referencia | Fuente |
| --- | --- |
| Arte oficial de The Legend of Zelda: Tears of the Kingdom | [Nintendo](https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/) |
| PlayStation 5 Slim con lector | [PlayStation](https://www.playstation.com/en-us/ps5/) |
| DualSense blanco | [PlayStation](https://www.playstation.com/en-us/accessories/dualsense-wireless-controller/) |
| Arte oficial de Super Mario Odyssey | [Nintendo](https://www.nintendo.com/us/store/products/super-mario-odyssey-switch/) |
| Arte oficial de Marvel's Spider-Man 2 | [PlayStation](https://www.playstation.com/en-us/games/marvels-spider-man-2/) |
| Arte oficial de God of War Ragnarök | [PlayStation](https://www.playstation.com/en-us/games/god-of-war-ragnarok/) |
| Xbox Series X Carbon Black con control | [Xbox](https://www.xbox.com/en-US/consoles/xbox-series-x) |
| Nintendo Switch con Joy-Con rojo y azul y empaque | [Nintendo](https://www.nintendo.com/us/store/products/nintendo-switch-neon-blue-neon-red-joy-con-117972/) |
| Steam Deck LCD: vista frontal | [Valve](https://www.steamdeck.com/en/deck) |
| Xbox Wireless Controller | [Xbox](https://www.xbox.com/en-US/accessories/controllers/xbox-wireless-controller) |
| Portada de Forza Horizon 5 | [Xbox](https://www.xbox.com/games/store/forza-horizon-5-standard-edition/9nkx70bbcdrn) |
| Logitech G413 TKL SE: modelo de referencia para el teclado genérico | [Logitech G](https://www.logitechg.com/en-ca/shop/p/g413-tkl-se-gaming-keyboard) |
| 8BitDo SN30 Pro USB: modelo de referencia para el control retro | [8BitDo](https://shop.8bitdo.com/products/8bitdo-sn30-pro-wired-gamepad-for-switch-pc-retropie-raspberry-pi) |
| Mayflash Wii to HDMI: modelo de referencia para el adaptador retro | [Mayflash](https://www.mayflash.com/product/wii_to_hdmi_adapter.html) |
| Logitech G335: modelo de referencia para los audífonos | [Logitech G](https://www.logitechg.com/en-us/shop/p/g335-gaming-headset) |

## Entrega y ejecución

Clona este repositorio, instala las dependencias con `npm ci` y ejecuta `npm run dev`. Para comprobar el código utiliza `npm run lint` y `npm run build`.

La entrega incluye código, recursos locales, configuración y este README. `node_modules` y `dist` se generan localmente y no se suben a Git. No se requieren credenciales ni un archivo `.env`.
