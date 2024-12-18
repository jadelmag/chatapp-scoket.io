# CHATAPP Backend

Este es el backend de una aplicación de chat en tiempo real que utiliza **Socket.IO**, **Express**, **Mongoose**, y otras tecnologías como **JWT** para autenticación, **bcryptjs** para encriptación de contraseñas y **dotenv** para la gestión de variables de entorno.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes
- MongoDB (ya sea localmente o en un servicio como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

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

3. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=4000
DB_USER=<user_ddbb>
DB_PASS =<password_ddbb>
DB_CNN_STRING=<tu_url_de_conexion_a_mongodb>
JWT_KEY=<tu_clave_secreta_para_jwt>
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Scripts disponibles

`npm run dev`: Inicia el servidor de desarrollo con nodemon, que recarga automáticamente el servidor cuando hay cambios en el código.

`npm run start`: Inicia el servidor en modo producción.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- bcryptjs: Para el hash y la validación de contraseñas.

- cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

- dotenv: Para gestionar las variables de entorno.

- express: Framework web minimalista para Node.js.

- express-validator: Para realizar validaciones de entradas en las solicitudes HTTP.

- jsonwebtoken (JWT): Para la creación y verificación de tokens JWT, utilizados para la autenticación.

- mongoose: ODM para interactuar con MongoDB de forma fácil y estructurada.

- socket.io: Para habilitar la comunicación en tiempo real entre el servidor y el cliente.

- uuid: Para generar identificadores únicos universales (UUIDs).


## Estructura del Proyecto

A continuación se detalla la estructura del proyecto y la función de cada directorio y archivo:


- controllers/: Controladores que manejan la lógica de negocio para las rutas.
- database/: Contiene la configuración de la base de datos, como la conexión a MongoDB.
- helpers/: Funciones auxiliares y utilitarias que son reutilizadas en varias partes del proyecto. Por ejemplo, funciones para el manejo de errores, validaciones, etc.
- logcolors/: Archivos relacionados con la configuración y personalización de colores para los logs, que facilitan la lectura y depuración.
- middleware/: Middlewares de Express.
- models/: Contiene los modelos de datos para MongoDB.
- router/: Rutas de la API.
- index.ts: Archivo principal.

## Licencia

Este proyecto está bajo la Licencia MIT.
