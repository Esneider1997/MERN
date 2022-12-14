import express, { application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Aquí incluirá todas las conf. de middleware, asi como diferentes configuracuines de paquetes
// NOTA: El middleware es basicamente algo que corre entre diferentes peticiones basicamente, funciones qe se ejecutran cosas diferentes
/* CONFIGURATIONS */
const __filename = fileURLToPath( import.meta.url ) // es para tomar la ur y especificamente cuando usas los modulos. 
const __dirname = path.dirname( __filename )

// vamos a configurar el dotenv.config e invocaremos para que podamos usar archivos dotenv
dotenv.config()

// igualamos la variable app para que podamos invocar nuestra aplicacion de express
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static( path.join( __dirname, 'public/assets' )))

// So next thing is we're going to setup the file storage
// Entonces, lo siguiente es configurar el almacenamiento de archivos

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
// 1: So a lot of these configurations are coming from the package instructions, So Basically I got all of this information from the GitHub repositore of "multer"
// 1: Así que muchas de estas configuraciones vienen de las instrucciones del paquete, Así que básicamente tengo toda esta información del repositorio GitHub de "multer"
// https://www.npmjs.com/package/multer

const upload = multer({ storage })
// 2: So that will help us save it and anytime we need to upload a file we're going to be using this varibale "upload"
// y cada vez que necesitemos subir un archivo vamos a utilizar esta varibale

//  And from here we´re going to actually setup our Mongo Database
// y desde aqui nosotros vamos a configurar nuestra base de datos. 

//(26:06) Aqui vamos a escribir nuestra funcion de autenticacion de registro
// aqui vamos a registrar la API desde el front
/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register)
//Nota: Esto hace que vamos a subir nuestra foto localmente en los activos

/* MONGOOSE SEUP  */
const PORT = process.env.PORT || 6001
mongoose.set('strictQuery', false); // add for my
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch( (error) => console.log(`${error} did not connect`)) 
//(20: 30) apartir de aqui puedes abrir tu terminal e intentar correrlo