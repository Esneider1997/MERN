import Express from "express";
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







