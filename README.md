# Proyecto #1 – Mini Blog

## Video explicativo

> [Espacio reservado para el video explicativo de la aplicación]

---

## Descripción general

Esta aplicación es un **Mini Blog SPA** desarrollado con **HTML, CSS y JavaScript puro**. Consume la API de **DummyJSON** para obtener publicaciones reales y permite crear contenido nuevo de forma local.

La página ofrece una experiencia dinámica con navegación entre secciones, renderizado de cards, estados de carga y gestión de publicaciones.

---

## ¿Qué hace la página?

La aplicación permite al usuario:

* Ver un listado de publicaciones obtenido desde la API (GET).
* Buscar publicaciones mediante parámetros de consulta.
* Crear nuevas publicaciones localmente (POST simulado en memoria).
* Navegar entre secciones sin recargar la página.
* Ver el detalle de una publicación.
* Eliminar publicaciones.
* Validar el formulario de creación antes de enviar.
* Filtrar publicaciones con criterios adicionales.
* Visualizar una sección de "Mis Posts" con publicaciones creadas por el usuario.
* Interactuar con estados UI claros: carga, éxito, vacío y error.
* Usar la aplicación en dispositivos móviles y de escritorio.

---

## Arquitectura y organización del código

El proyecto está organizado para separar responsabilidades y facilitar el mantenimiento.

### Estructura de carpetas

```
html/
  index.html
styles/
  styles.css
js/
  api.js
  main.js
  navigation.js
  posts.js
  store.js
  ui.js
```

### Roles de cada archivo

* `api.js` → realiza las llamadas a la API de DummyJSON y gestiona los endpoints.
* `main.js` → inicializa la aplicación y conecta eventos globales.
* `navigation.js` → controla la navegación entre secciones de la SPA.
* `posts.js` → renderiza la lista de publicaciones y tarjetas en el DOM.
* `store.js` → administra los posts creados por el usuario en memoria.
* `ui.js` → actualiza los estados visuales (loading, success, empty, error) y muestra mensajes.

---

## Flujo clave de la aplicación

1. La página carga y se muestra la sección `Home`.
2. `main.js` inicializa la app y solicita las publicaciones con `api.js`.
3. `posts.js` renderiza las cards de cada publicación en el DOM.
4. El usuario puede usar el buscador y filtros para refinar los resultados.
5. Al seleccionar una publicación, se muestra `detailSection` con la información completa.
6. Desde el detalle o la lista, el usuario puede eliminar una publicación.
7. En `createSection`, el formulario valida los campos antes de crear un post nuevo.
8. Las publicaciones del usuario se almacenan en `store.js` y se muestran en `myPostsSection`.

---

## Secciones principales de la aplicación

* `homeSection` → listado principal de publicaciones.
* `createSection` → formulario para crear nuevos posts.
* `detailSection` → vista de detalle de una publicación seleccionada.
* `myPostsSection` → publicaciones creadas por el usuario.

---

## Funcionalidades implementadas

* ✔ Listado de publicaciones desde la API (GET)
* ✔ Búsqueda de publicaciones mediante query params
* ✔ Creación de publicaciones (POST) en memoria
* ✔ Render dinámico de datos en el DOM
* ✔ Manejo de UI States:
  * loading
  * success
  * empty
  * error
* ✔ Navegación entre secciones:
  * Home
  * Crear Post
  * Detalle de publicación
  * Mis Posts
* ✔ Visualización de posts en formato tipo **card**
* ✔ Simulación de posts creados por el usuario (en memoria)

---

## Funcionalidades clave y objetivos

1️⃣ Vista de detalle de publicación

* Presenta título, contenido, autor y otros datos de la publicación.
* Permite regresar al listado o eliminar el post desde la vista de detalle.

2️⃣ Eliminar publicación (Delete)

* La aplicación puede quitar publicaciones de la lista local y de la sección "Mis Posts".

3️⃣ Validaciones en formulario (JavaScript)

* El formulario de creación exige campos obligatorios.
* Muestra mensajes de error si faltan datos o son inválidos.

4️⃣ Paginación de publicaciones

* El listado se puede dividir en páginas para mejorar la navegación.
* Facilita la carga y visualización de un mayor número de posts.

5️⃣ Filtros adicionales (mínimo 3 criterios)

* Filtro por título.
* Filtro por autor.
* Filtro por categoría o etiqueta.
* Combina criterios para resultados más precisos.

6️⃣ Mejora visual de UI States

* Estados claros para cargar contenido, mostrar éxito, indicar ausencia de resultados y detectar errores.
* Mensajes y animaciones suaves para mejorar la experiencia.

7️⃣ Vista Mis Post (Sección adicional)

* Muestra solo los posts creados por el usuario.
* Permite eliminar publicaciones propias.

8️⃣ Responsive Design

* Diseño adaptable para móviles, tablets y escritorio.
* Cards, formularios y navegación responsivos.

9️⃣ Organización del código JS

* Código modularizado por funcionalidades.
* Separación entre lógica de API, UI, renderizado y navegación.

---

## Estructura general del HTML

La aplicación está construida como una SPA basada en secciones dentro de `index.html`.

```html
<body>
  <header>...</header>

  <main>
    <section id="homeSection">...</section>
    <section id="createSection">...</section>
    <section id="detailSection">...</section>
    <section id="myPostsSection">...</section>
  </main>

  <footer>...</footer>
</body>
```

Cada sección se muestra u oculta según la navegación interna sin recargar la página.

---

## Tecnologías usadas

* HTML5
* CSS3
* JavaScript (Vanilla)
* Fetch API
* DummyJSON API

---

## Codificadores

* José Rivera[JoseKingUVG]
* Esteban Montenegro[EstebanMon08]

---

## Notas finales

Este README describe el estado actual del proyecto y la estructura esperada para la versión completa. La aplicación está diseñada para seguir creciendo con nuevas funciones y una mejor experiencia de usuario.
