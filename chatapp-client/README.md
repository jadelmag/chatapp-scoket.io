# CHATAPP - CLIENT

Este es un proyecto de ejemplo que utiliza **React**, **Vite**, **TypeScript** y **Socket.IO-client** para crear una aplicación en tiempo real.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes

## Instalación

1. Clona el repositorio:

```bash
 git clone <URL_DEL_REPOSITORIO>
 cd <nombre_del_directorio>
```

2. Instala las dependencias:

Si usas npm:

```bash
npm install
```

O si prefieres yarn:

```bash
yarn install
```

## Desarrollo

Para iniciar el servidor de desarrollo ejecuta:

```bash
npm run dev
```

Esto iniciará Vite y la aplicación será accesible en http://localhost:8080 de forma predeterminada.

## Estructura del Proyecto

A continuación se detalla la estructura del proyecto y la función de cada directorio y archivo:

- `assets/`: Directorio donde se almacenan imágenes, íconos, fuentes, y otros recursos estáticos que se usan en la aplicación.

- `auth/`: Contexto que se encarga de la comunicación con el backend para las siguientes funciones: login, signin, logout, verifytoken.

- `components/`: Componentes React reutilizables. Aquí se encuentran todos los componentes que pueden ser usados en varias páginas o lugares de la aplicación, como botones, formularios, listas, etc.

- `constants/`: Directorio donde se definen las constantes globales de la aplicación, como URLs de API, claves de configuración, mensajes estáticos, etc.

- `context/`: Contiene los contextos de React, como el contexto de autenticación, que permite gestionar el estado global de la aplicación de manera centralizada (por ejemplo, el estado del usuario o el tema).

- `css/`: Archivos CSS globales o estilos específicos que no pertenecen a componentes individuales. Es común que aquí se encuentren estilos globales como variables, mixins, reset de CSS, etc.

- `helpers/`: Funciones y utilidades comunes que se utilizan en varias partes de la aplicación. Pueden ser funciones para formatear fechas, manejar validaciones o gestionar almacenamiento local.

- `hooks/`: Hooks personalizados de React. Son funciones que encapsulan lógica reutilizable, como manejar formularios, interactuar con APIs o administrar eventos del navegador.

- `interfaces/`: Archivos TypeScript donde se definen las interfaces o tipos globales para las entidades del proyecto, como datos de usuario, respuestas de API, configuraciones, etc.

- `pages/`: Directorio donde se encuentran las páginas de la aplicación, que generalmente están asociadas a rutas. Cada archivo en esta carpeta representa una vista o pantalla principal en la aplicación.

- `reducers/`: Directorio que contiene los reductores de estado para manejar la lógica de actualización del estado en una aplicación React que utiliza `useReducer` o `Redux`.

- `router/`: Configuración y componentes relacionados con el enrutamiento de la aplicación. Aquí se puede encontrar el archivo donde se definen las rutas y la lógica de navegación de la aplicación.

- `main.tsx`: Componente principal de la aplicación, donde se monta la aplicación de React. Aquí se importa el componente `App` y se incluye en el DOM.

- `vite.config.ts`: Configuración de Vite, donde se definen los parámetros de construcción, optimización y otros ajustes específicos de Vite.

## Scripts disponibles

`npm run dev`: Inicia el servidor de desarrollo usando Vite.
`npm run build`: Crea una versión optimizada para producción.
`npm run preview`: Muestra una vista previa de la aplicación de producción.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork de este repositorio.

2. Crea una rama con tus cambios (git checkout -b feature/nueva-funcionalidad).

3. Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').

4. Sube tus cambios a tu repositorio (git push origin feature/nueva-funcionalidad).

5. Abre un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
