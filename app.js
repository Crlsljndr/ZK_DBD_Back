const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos local de MongoDB'))
    .catch(err => console.error(`Error de conexión a la base de datos: ${err}`));

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// Importación de las rutas
const api = require('./api/routes');
app.use('/api/v1', api);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
