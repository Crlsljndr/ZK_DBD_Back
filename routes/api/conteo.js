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

router.delete('/deleteKiller/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await GestionDBD.eliminarKiller(id);
        
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ error: result.message });
        }
    } catch (error) {
        console.error("Error en la eliminación:", error);
        res.status(500).json({ error: "Error en la eliminación del killer" });
    }
});



module.exports = router;