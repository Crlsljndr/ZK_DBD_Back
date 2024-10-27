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

router.post('/addKiller', async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre del killer es obligatorio" });
    }

    try {
        const killerId = await GestionDBD.agregarKiller(nombre);
        res.status(201).json({
            message: "Killer agregado correctamente",
            killerId: killerId
        });
    } catch (error) {
        console.error("Error al agregar el killer:", error);
        res.status(500).json({ error: "Error al agregar el killer" });
    }
});



module.exports = router;