const express = require('express');
require('dotenv').config();
const { list } = require('./controllers/conteo');
const app = express();

// Configurar el tipo de entrada y salida de datos, en este caso JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false}));




app.get('/list', async (req, res) => {
    try {
        const killers = await list(); // Llama a la función list del controlador
        res.json(killers); // Envía la respuesta en formato JSON
    } catch (error) {
        console.error("Error al obtener la lista de killers:", error);
        res.status(500).json({ error: "Error al obtener la lista de killers" });
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});