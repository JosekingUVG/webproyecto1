# Proyecto #1 – Mini Blog (Base)

## Descripción

Este proyecto consiste en el desarrollo de una aplicación web tipo **Blog**, utilizando **HTML, CSS y JavaScript puro**, consumiendo la API de **DummyJSON**.

Actualmente, el proyecto se encuentra en una fase inicial basada en el laboratorio previo, y será extendido para cumplir con todos los requerimientos del proyecto.

---

# Estado actual del proyecto

Actualmente la aplicación ya cuenta con las siguientes funcionalidades:

### Funcionalidades implementadas

* ✔ Listado de publicaciones desde la API (GET)
* ✔ Búsqueda de publicaciones mediante query params
* ✔ Creación de publicaciones (POST)
* ✔ Render dinámico de datos en el DOM
* ✔ Manejo básico de UI States:

  * loading
  * success
  * empty
  * error
* ✔ Navegación entre secciones:

  * Home
  * Crear Post
* ✔ Visualización de posts en formato tipo **card**
* ✔ Simulación de posts creados por el usuario (en memoria)

---

# Estructura actual del proyecto

```id="ux2p2r"
lab5/

html/
  index.html

css/
  styles.css

js/
  main.js
```

---

# Secciones actuales (HTML)

La aplicación funciona como una SPA (Single Page Application) utilizando secciones:

```id="ydb3rj"
- homeSection
- createSection
```

---

# Mejoras y funcionalidades pendientes

Para cumplir completamente con los requerimientos del proyecto, se implementarán las siguientes mejoras:

### Funcionalidades principales

- 1️⃣ Vista de detalle de publicación
- 2️⃣ Eliminar publicación (Delete)
- 3️⃣ Validaciones en formulario (JavaScript)
- 4️⃣ Paginación de publicaciones
- 5️⃣ Filtros adicionales (mínimo 3 criterios)
- 6️⃣ Mejora visual de UI States
- 7️⃣ Vista Mis Post (Sección adicional) 
- 8️⃣ Responsive Design
- 9️⃣ Organización del código JS 

---

### Navegación y nuevas secciones

Se agregarán nuevas secciones dentro del mismo `index.html`:

```id="t7f3t1"
- detailSection
- myPostsSection
```

---

### Sección adicional

Se implementará una sección adicional:

✔ **Mis Posts**

Permitirá:

* visualizar publicaciones creadas por el usuario
* eliminar publicaciones
* (opcional) editar publicaciones

---

# Arquitectura futura (JavaScript)

Para mejorar la organización del código, se modularizará la lógica en múltiples archivos:

```id="0ff9yo"
js/

main.js        → inicialización y eventos globales
api.js         → llamadas a la API (GET, POST, etc.)
posts.js       → renderizado de posts
ui.js          → manejo de estados (UI States)
navigation.js  → control de secciones
```

---

# Mejoras en UI / UX

Se planea mejorar la experiencia del usuario mediante:

* Mejor diseño de cards
* Feedback visual en acciones (crear, error, carga)
* Animaciones simples
* Organización visual más clara

---

# Responsive Design

Se implementará diseño responsive para:

* dispositivos móviles
* tablets
* pantallas de escritorio

Incluyendo:

* layout adaptable
* cards responsivas
* formulario ajustable

---

# Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)
* Fetch API
* DummyJSON API

---

# Notas

* El proyecto se está desarrollando en equipo
* Se utilizará Git y GitHub para control de versiones
* Se continuará iterando sobre esta base para cumplir todos los requerimientos del proyecto
