const express = require('express');
const router = express.Router();

// Importa los controladores
const killersController = require('./controllers/killers');

// Define las rutas
router.get('/killers', killersController.listKillers);
router.post('/killers', killersController.agregarKiller);
router.put('/killers/:id', killersController.editarKiller);
router.delete('/killers/:id', killersController.eliminarKiller);
router.post('/killers/partida', killersController.registrarPartida);

module.exports = router;
