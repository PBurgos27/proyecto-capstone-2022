import express from 'express';
import { PORT } from './config.js';
import cookieParser from 'cookie-parser';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import doctorRoutes from './routes/doctor.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';

import cors from 'cors'

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(__dirname +'/public'));

app.set('view engine', 'ejs');
app.set('views', join(__dirname,"views"))

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(adminRoutes);
app.use(doctorRoutes);
app.use(pacienteRoutes);


app.listen(PORT);
console.log(`Server is running in PORT: ${PORT}`)