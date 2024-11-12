const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const killersSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    numeroDeVeces: {
        type: Number,
        default: 0,
    },
    partidas: [
        {
            fecha: {
                type: String,
                required: true,
            },
            hora: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true // Agrega marcas de tiempo a los documentos
});

// Exportar el modelo usando el nombre en plural
module.exports = mongoose.model('Killers', killersSchema, 'killers');
