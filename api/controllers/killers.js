const mongoose = require('mongoose');
const Killers = require('../models/killers'); // Importación del modelo Killers
const { sendJSONresponse } = require('./utils'); // Utilidad para enviar respuestas JSON

// Método para listar todos los killers
module.exports.listKillers = async function (req, res) {
    try {
        const killers = await Killers.find();
        return sendJSONresponse(res, 200, killers);
    } catch (error) {
        console.error('Error al listar los killers:', error);
        return sendJSONresponse(res, 500, { error: 'Error al listar los killers' });
    }
};

// Método para registrar una partida de un killer
module.exports.registrarPartida = async function (req, res) {
    const { killerId, fecha, hora } = req.body;

    try {
        const result = await Killers.updateOne(
            { _id: mongoose.Types.ObjectId(killerId) },
            {
                $inc: { numeroDeVeces: 1 },
                $push: { partidas: { fecha, hora } }
            }
        );

        if (result.modifiedCount > 0) {
            console.log('Partida registrada correctamente.');
            return sendJSONresponse(res, 200, { message: 'Partida registrada correctamente' });
        } else {
            console.log('No se encontró el killer con el ID especificado.');
            return sendJSONresponse(res, 404, { error: 'No se encontró el killer con el ID especificado' });
        }
    } catch (error) {
        console.error('Error al registrar la partida:', error);
        return sendJSONresponse(res, 500, { error: 'Error al registrar la partida' });
    }
};

// Método para agregar un nuevo killer
module.exports.agregarKiller = async function (req, res) {
    const { nombre } = req.body;

    if (!nombre) {
        return sendJSONresponse(res, 400, { error: 'El campo nombre es obligatorio' });
    }

    try {
        const nuevoKiller = new Killers({ nombre });
        const result = await nuevoKiller.save();

        console.log('Killer agregado correctamente:', result._id);
        return sendJSONresponse(res, 201, { message: 'Killer agregado correctamente', id: result._id });
    } catch (error) {
        console.error('Error al agregar el killer:', error);
        return sendJSONresponse(res, 500, { error: 'Error al agregar el killer' });
    }
};

// Método para eliminar un killer
module.exports.eliminarKiller = async function (req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('ID no válido');
        return sendJSONresponse(res, 400, { error: 'ID no válido' });
    }

    try {
        const result = await Killers.deleteOne({ _id: mongoose.Types.ObjectId(id) });

        if (result.deletedCount > 0) {
            console.log('Killer eliminado correctamente.');
            return sendJSONresponse(res, 200, { message: 'Killer eliminado correctamente' });
        } else {
            console.log('No se encontró el killer con el ID especificado.');
            return sendJSONresponse(res, 404, { error: 'No se encontró el killer con el ID especificado' });
        }
    } catch (error) {
        console.error('Error al eliminar el killer:', error);
        return sendJSONresponse(res, 500, { error: 'Error al eliminar el killer' });
    }
};

// Método para editar el nombre de un killer
module.exports.editarKiller = async function (req, res) {
    const { id } = req.params;
    const { nuevoNombre } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('ID no válido');
        return sendJSONresponse(res, 400, { error: 'ID no válido' });
    }

    try {
        const result = await Killers.updateOne(
            { _id: mongoose.Types.ObjectId(id) },
            { $set: { nombre: nuevoNombre } }
        );

        if (result.modifiedCount > 0) {
            console.log('Nombre del killer editado correctamente.');
            return sendJSONresponse(res, 200, { message: 'Nombre del killer editado correctamente' });
        } else {
            console.log('No se encontró el killer con el ID especificado.');
            return sendJSONresponse(res, 404, { error: 'No se encontró el killer con el ID especificado' });
        }
    } catch (error) {
        console.error('Error al editar el nombre del killer:', error);
        return sendJSONresponse(res, 500, { error: 'Error al editar el nombre del killer' });
    }
};
