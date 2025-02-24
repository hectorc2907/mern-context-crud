// Importa el módulo express para crear aplicaciones web
import express from "express";

// Importa cors para el manejo de politicas
import cors from "cors";

// Importa el middleware express-fileupload para manejar la carga de archivos en las solicitudes
import fileUpload from "express-fileupload";

// Importa el middleware morgan para registrar las solicitudes HTTP en la consola
import morgan from "morgan";

// Importa las rutas relacionadas con los posts desde el archivo correspondiente
import postsRoutes from "./routes/postsRoute.js";

// Crea una nueva instancia de una aplicación Express
const app = express();

// Configuración de middlewares:

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para parsear datos en formato URL-encoded (por ejemplo, formularios HTML)
app.use(express.urlencoded({ extended: false }));

// Configuramos CORS para permitir solicitudes desde el frontend definido en las variables de entorno.
app.use(
  cors({
    credentials: true, // Permite el envío de cookies a través de peticiones CORS.
    origin: process.env.FRONTEND_URL, // Define qué origen está permitido.
  })
);

// Configura el middleware express-fileupload para manejar archivos temporales
app.use(
  fileUpload({
    tempFileDir: "./upload", // Define el directorio temporal donde se guardarán los archivos
    useTempFiles: true, // Habilita el uso de archivos temporales
  })
);

// Middleware para registrar las solicitudes HTTP en la consola en formato 'dev'
app.use(morgan("dev"));

// Definimos las rutas de la aplicación:

// Ruta directa de prueba para verificar que el backend está funcionando correctamente
app.get("/", (req, res) => res.send("test"));

// Usamos las rutas relacionadas con los posts, bajo el prefijo '/api'
app.use("/api", postsRoutes);

// Exporta la instancia de la aplicación Express para que pueda ser utilizada en otros archivos
export { app };
