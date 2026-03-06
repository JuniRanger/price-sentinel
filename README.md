PriceSentinel 🛰️

Automated Price Monitoring with Web Scraping

PriceSentinel es una aplicación web que permite monitorear productos en cualquier sitio web y detectar cambios de precio automáticamente mediante técnicas de web scraping.

El sistema permite registrar productos indicando una URL y los selectores de información a extraer, y ejecuta procesos recurrentes que verifican cambios de precio.

El scraping se realiza utilizando Maxun, lo que permite extraer información desde cualquier sitio web configurable.

⸻

📚 Contexto académico

Este proyecto fue desarrollado como parte del:

**Examen de Desarrollo Web — Entrega: 06/03/2026**

### Requerimientos del examen

Desarrollar una aplicación que:

- Realice web scraping.
- Permita monitorear productos en cualquier sitio web.
- Permita ingresar:
  - URL del producto.
  - Información a extraer (mínimo: nombre y precio).
- Detecte cambios de precio.
- Ejecute el scraping de forma recurrente.
- Funcione como una solución tipo “cazador de precios”.
- Utilice Maxun para la extracción de datos.

Adicionalmente, el sistema implementa:

- Detección automática de cambios de precio.
- Sistema de alertas cuando el precio disminuye.

⸻

🚀 Descripción del producto

PriceSentinel funciona como un monitor automático de precios.

Un usuario puede registrar un producto proporcionando:

- URL del producto.
- Selector CSS del nombre.
- Selector CSS del precio.
- Email de notificación.

El sistema guarda la configuración y posteriormente ejecuta procesos de scraping periódicos para verificar si el precio cambió.

Si se detecta una disminución del precio, el sistema genera una alerta de cambio de precio.

⸻

🧠 Arquitectura del sistema

El proyecto utiliza una arquitectura MVC moderna con TypeScript.

**Principios aplicados:**

- Separación de responsabilidades.
- Arquitectura modular.
- Automatización mediante tareas programadas.

**Capas principales:**

| Capa      | Responsabilidad              |
|----------|------------------------------|
| Model    | Representación de datos      |
| View     | Renderizado de interfaz      |
| Controller | Manejo de solicitudes HTTP |
| Service  | Lógica de negocio            |
| Jobs     | Procesos automáticos         |

⸻

🏗 Estructura del proyecto

```text
pricesentinel
│
├── src
│   ├── config
│   │   ├── db.ts
│   │   └── maxun.ts
│   ├── controllers
│   │   └── product.controller.ts
│   ├── models
│   │   └── product.model.ts
│   ├── services
│   │   ├── scraper.service.ts
│   │   ├── product.service.ts
│   │   └── notification.service.ts
│   ├── jobs
│   │   └── price-monitor.job.ts
│   ├── routes
│   │   └── product.routes.ts
│   ├── views
│   │   ├── layouts
│   │   │   └── main.hbs
│   │   ├── products
│   │   │   ├── index.hbs
│   │   │   └── create.hbs
│   │   └── partials
│   │       ├── navbar.hbs
│   │       └── productCard.hbs
│   ├── public
│   │   ├── css
│   │   └── js
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

⸻

⚙️ Tecnologías utilizadas

**Backend:**

- Node.js
- Express
- TypeScript

**Motor de vistas:**

- Handlebars

**Scraping:**

- Maxun

**Automatización:**

- node-cron

**Base de datos:**

- SQLite

**Estilos:**

- CSS / Tailwind (opcional)

⸻

🔄 Flujo de funcionamiento

1. **El usuario registra un producto**, indicando:
   - URL.
   - Selector del nombre.
   - Selector del precio.
   - Email.
2. **El sistema guarda la configuración.**
3. **Un proceso automático ejecuta scraping periódicamente.**
4. **Se extrae:**
   - Nombre del producto.
   - Precio actual.
5. **El sistema compara el precio actual con el último registrado.**
6. **Si hay cambio de precio**, se evalúa si:
   - El precio disminuyó.
   - El precio aumentó.
7. **Se genera una alerta** cuando el precio disminuye.

⸻

⏱ Sistema de monitoreo

El sistema ejecuta una tarea programada mediante `node-cron`.

**Frecuencia:**

- Cada 30 minutos.

**Proceso:**

1. Obtener todos los productos registrados.
2. Ejecutar el scraping.
3. Comparar precios.
4. Guardar cambios.
5. Generar alerta si el precio disminuyó.

⸻

🧩 Modelo de datos

**Producto monitoreado (`Product`):**

- `id`
- `url`
- `nameSelector`
- `priceSelector`
- `name`
- `currentPrice`
- `lastPrice`
- `email`
- `createdAt`

**Opcional — historial de precios (`PriceHistory`):**

- `product_id`
- `price`
- `date`

Esto permite mantener un historial de cambios de precio en el tiempo.

⸻

🖥 Interfaz de usuario

La aplicación incluye:

**Página principal**

- Formulario para registrar productos, con campos:
  - Product URL.
  - Name Selector.
  - Price Selector.
  - Email.

⸻

**Panel de productos monitoreados**

Muestra:

- Nombre del producto.
- Precio actual.
- Estado del precio.

Estados posibles:

- Price Dropped.
- Price Increased.
- No Change.

⸻

📊 Posibles mejoras futuras

Aun cuando el proyecto cumple con los requerimientos del examen, se pueden implementar mejoras adicionales:

- Historial completo de precios.
- Gráficas de cambios.
- Alertas por email.
- Notificaciones push.
- Detección automática de selectores.
- Dashboard de análisis de precios.

⸻

🧪 Ejemplo de uso

Un usuario quiere monitorear el precio de unos audífonos en Amazon:

1. Ingresa la URL del producto.
2. Define el selector del nombre.
3. Define el selector del precio.
4. Registra el producto.

El sistema monitorea el precio automáticamente y alerta cuando detecta un descuento.

⸻

🎯 Objetivo del proyecto

El objetivo de PriceSentinel es demostrar la implementación práctica de:

- Web scraping.
- Arquitectura MVC.
- Automatización de tareas.
- Integración de herramientas de scraping.
- Desarrollo web con TypeScript.

Todo dentro de una aplicación funcional de monitoreo automático de precios.

PriceSentinel 🛰️

Automated Price Monitoring with Web Scraping

PriceSentinel es una aplicación web que permite monitorear productos en cualquier sitio web y detectar cambios de precio automáticamente mediante técnicas de web scraping.

El sistema permite registrar productos indicando una URL y los selectores de información a extraer, y posteriormente ejecuta procesos recurrentes que verifican cambios de precio.

El scraping se realiza utilizando Maxun, permitiendo extraer información desde cualquier sitio web configurable.

⸻

📚 Contexto académico

Este proyecto fue desarrollado como parte del:

Examen de Desarrollo Web — Entrega: 06/03/2026

Requerimientos del examen

Desarrollar una aplicación que:
	•	Realice web scraping
	•	Permita monitorear productos en cualquier sitio web
	•	Permita ingresar:
	•	URL del producto
	•	Información a extraer (mínimo: nombre y precio)
	•	Detecte cambios de precio
	•	Ejecute el scraping de forma recurrente
	•	Funcione como una solución tipo “cazador de precios”
	•	Utilice Maxun para la extracción de datos

Adicionalmente, el sistema implementa:
	•	Detección automática de cambios de precio
	•	Sistema de alertas cuando el precio disminuye

⸻

🚀 Descripción del producto

PriceSentinel funciona como un monitor automático de precios.

Un usuario puede registrar un producto proporcionando:
	•	URL del producto
	•	Selector CSS del nombre
	•	Selector CSS del precio
	•	Email de notificación

El sistema guardará la configuración y posteriormente ejecutará procesos de scraping periódicos para verificar si el precio cambió.

Si se detecta una disminución del precio, el sistema genera una alerta de cambio de precio.

⸻

🧠 Arquitectura del sistema

El proyecto utiliza una arquitectura MVC moderna con TypeScript.

Principios aplicados:
	•	Separación de responsabilidades
	•	Arquitectura modular
	•	Automatización mediante tareas programadas

Capas principales:

Capa	Responsabilidad
Model	Representación de datos
View	Renderizado de interfaz
Controller	Manejo de solicitudes HTTP
Service	Lógica de negocio
Jobs	Procesos automáticos recurrentes


⸻

🏗 Estructura del proyecto

pricesentinel
│
├── src
│
│   ├── config
│   │     db.ts
│   │     maxun.ts
│
│   ├── controllers
│   │     product.controller.ts
│
│   ├── models
│   │     product.model.ts
│
│   ├── services
│   │     scraper.service.ts
│   │     product.service.ts
│   │     notification.service.ts
│
│   ├── jobs
│   │     price-monitor.job.ts
│
│   ├── routes
│   │     product.routes.ts
│
│   ├── views
│   │
│   │     ├── layouts
│   │     │      main.hbs
│   │
│   │     ├── products
│   │     │      index.hbs
│   │     │      create.hbs
│   │
│   │     └── partials
│   │            navbar.hbs
│   │            productCard.hbs
│
│   ├── public
│   │     css
│   │     js
│
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── README.md


⸻

⚙️ Tecnologías utilizadas

Backend:
	•	Node.js
	•	Express
	•	TypeScript

Motor de vistas:
	•	Handlebars

Scraping:
	•	Maxun

Automatización:
	•	node-cron

Base de datos:
	•	SQLite

Estilos:
	•	CSS / Tailwind (opcional)

⸻

🔄 Flujo de funcionamiento

1️⃣ Usuario registra un producto

URL
Selector del nombre
Selector del precio
Email

2️⃣ El sistema guarda la configuración.

3️⃣ Un proceso automático ejecuta scraping periódicamente.

4️⃣ Se extrae:

Nombre del producto
Precio actual

5️⃣ El sistema compara el precio actual con el último registrado.

6️⃣ Si hay cambio:

Price drop detected

7️⃣ Se genera una alerta.

⸻

⏱ Sistema de monitoreo

El sistema ejecuta una tarea programada mediante node-cron.

Frecuencia:

Cada 30 minutos

Proceso:
	1.	Obtener todos los productos registrados
	2.	Ejecutar scraping
	3.	Comparar precios
	4.	Guardar cambios
	5.	Generar alerta si el precio disminuyó

⸻

🧩 Modelo de datos

Producto monitoreado:

Product
-------
id
url
nameSelector
priceSelector
name
currentPrice
lastPrice
email
createdAt

Opcional:

PriceHistory
------------
product_id
price
date

Esto permite mantener un historial de cambios.

⸻

🖥 Interfaz de usuario

La aplicación incluye:

Página principal

Formulario para registrar productos.

Campos:

Product URL
Name Selector
Price Selector
Email


⸻

Panel de productos monitoreados

Muestra:

Nombre del producto
Precio actual
Estado del precio

Estados posibles:

Price Dropped
Price Increased
No Change


⸻

📊 Posibles mejoras futuras

Aunque el proyecto cumple con los requerimientos del examen, se pueden implementar mejoras adicionales:
	•	Historial completo de precios
	•	Gráficas de cambios
	•	Alertas por email
	•	Notificaciones push
	•	Detección automática de selectores
	•	Dashboard de análisis de precios

⸻

🧪 Ejemplo de uso

Un usuario quiere monitorear el precio de unos audífonos en Amazon.
	1.	Ingresa la URL del producto
	2.	Define el selector del nombre
	3.	Define el selector del precio
	4.	Registra el producto

El sistema monitorea el precio automáticamente y alerta cuando detecta un descuento.

⸻

🎯 Objetivo del proyecto

El objetivo de PriceSentinel es demostrar la implementación práctica de:
	•	Web scraping
	•	Arquitectura MVC
	•	Automatización de tareas
	•	Integración de herramientas de scraping
	•	Desarrollo web con TypeScript

Todo dentro de una aplicación funcional de monitoreo de precios.

