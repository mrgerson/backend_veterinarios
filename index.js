import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

console.log('variable de entorno', process.env.FRONTEND_URL)

const dominiosPermitidos = [process.env.FRONTEND_URL];

const whiteList = [process.env.FRONTEND_URL];

/* app.use(
  cors({
      origin: function (origin, callback) {
          console.log(origin)
          if (!origin ||  whiteList.includes(origin)) {
              return callback(null, origin);
          }
          return callback(
            new Error("No permitido por CORS")
          );
      },
      credentials: true,
  })
); */

const corsOptions = {
  origin: function (origin, callback) {
    console.log('este es el origin', origin)
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
