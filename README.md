# Pokédex — Reto Técnico Frontend Pleno

Aplicación web construida con **React + Vite** que consume la **PokéAPI** para listar,
buscar, filtrar y guardar como favoritos a los pokémon.

## Cómo correr el proyecto localmente

Requisitos: tener instalado **Node.js 18+**.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Luego abrir en el navegador la URL que muestra la terminal (por defecto `http://localhost:5173`).

Para generar el build de producción:

```bash
npm run build
npm run preview   # sirve el build localmente para verificarlo
```

No se necesita ninguna variable de entorno ni backend propio: la PokéAPI es pública y
no requiere autenticación.

## Funcionalidades implementadas

- **Listado de Pokémon**: tarjetas con imagen, nombre y tipo(s), con paginación
  (Anterior / Siguiente) usando los parámetros `limit` y `offset` de la API.
- **Buscador**: filtra por nombre sobre los pokémon ya cargados en la página actual.
- **Filtro por tipo (bonus)**: usa el endpoint `/type/{nombre}` para traer solo
  pokémon de un tipo específico.
- **Vista de detalle**: imagen, nombre, tipos y estadísticas base (hp, attack,
  defense, speed) con barras visuales. Accesible desde cualquier tarjeta.
- **Favoritos**: se pueden marcar/desmarcar desde el listado, el detalle o la vista
  de favoritos. Persisten en `localStorage`, por lo que sobreviven a recargar la
  página o cerrar el navegador.
- **Estados de carga y error**: loader animado mientras se piden datos, y un mensaje
  de error con botón "Reintentar" si la llamada a la API falla.
- **Diseño responsivo**: grilla adaptable (`auto-fill`) que reordena las tarjetas
  según el ancho de pantalla, probado en mobile y desktop.

## Decisiones técnicas

### Estructura de carpetas

```
src/
  api/         -> toda la comunicación con la PokéAPI en un solo módulo (pokeApi.js)
  components/  -> piezas de UI reutilizables y sin lógica de negocio propia
  pages/       -> una página por ruta (Listado, Detalle, Favoritos)
  hooks/       -> lógica reutilizable con estado (useFavorites)
  utils/       -> helpers puros (colores por tipo)
  styles/      -> CSS global
```

La idea fue separar claramente **de dónde vienen los datos** (`api/`), **cómo se
guarda el estado que persiste** (`hooks/`) y **cómo se muestra** (`components/` y
`pages/`), para que cada archivo tenga una sola responsabilidad y sea fácil de leer
o testear por separado.

### Librerías elegidas

- **React Router v6** para el ruteo (`/`, `/pokemon/:id`, `/favoritos`).
- **useState / useEffect** para todo el manejo de estado — no hizo falta Redux ni
  Zustand porque el estado es local a cada página, salvo los favoritos, que se
  resolvieron con un hook custom (`useFavorites`) en vez de Context, porque solo
  dos pantallas lo consumen directamente y pasarlo por props mantiene el flujo de
  datos explícito.
- **CSS plano** con variables (custom properties) en vez de una librería de UI,
  para tener control total del diseño y no depender de un bundle extra.
- No se usó TypeScript (es opcional según el enunciado), pero el código está
  organizado de forma que migrarlo sería directo: cada módulo tiene responsabilidades
  bien delimitadas y los objetos que se pasan entre componentes (`pokemon`) siempre
  tienen la misma forma (`{ id, name, image, types }`).

### Sobre el listado y el detalle

Al pedir el listado paginado, la PokéAPI solo devuelve `name` y `url` de cada
pokémon (sin imagen ni tipos), así que `getPokemonDetailsBatch` pide el detalle de
los 20 resultados **en paralelo** con `Promise.all` para poder mostrar imagen y
tipos directamente en las tarjetas sin tener que entrar al detalle.

### Favoritos

Se guarda en `localStorage` un array con la info mínima necesaria para pintar la
tarjeta (`id`, `name`, `image`, `types`), no solo el `id`. Así la vista de
Favoritos no depende de volver a golpear la API para mostrar la tarjeta completa.

## Lo que no llegué a implementar / cómo lo resolvería

- **Animaciones de transición entre vistas**: hay transiciones puntuales (hover en
  tarjetas, barras de stats), pero no una transición de página completa. Se podría
  agregar con `Framer Motion` envolviendo `<Routes>` y animando `opacity`/`x` en el
  cambio de ruta.
- **Deploy**: el proyecto está listo para desplegarse en Vercel o Netlify sin
  configuración adicional (`npm run build` genera `dist/`), pero no se hizo el
  deploy en esta entrega. Pasos: conectar el repo de GitHub en Vercel, framework
  preset "Vite", comando de build `npm run build`, carpeta de salida `dist`.
- **Tests automatizados**: no se pidieron explícitamente, pero si se agregaran,
  usaría Vitest + React Testing Library, empezando por `useFavorites` (lógica más
  crítica y aislada) y por el mapeo de datos de la API (`mapDetailToCard`).

## Git

El historial de commits sigue mensajes descriptivos por feature (setup del
proyecto, API + hook de favoritos, listado con paginación y búsqueda, detalle,
favoritos, filtro por tipo, estilos y README).
