const router = require('express').Router();
const GestionDBD = require('../../controllers/conteo');

router.get('/list', async (req, res) => {
    try {
        const killers = await GestionDBD.list(); // Llama a la función list del controlador
        res.json(killers); // Envía la respuesta en formato JSON
    } catch (error) {
        console.error("Error al obtener la lista de killers:", error);
        res.status(500).json({ error: "Error al obtener la lista de killers" });
    }
});



module.exports = router;