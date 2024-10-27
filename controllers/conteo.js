const { connectDB } = require('../db/database');

class GestionDBD {
    async list() {
        const db = await connectDB();
        const collection = db.collection('Killer');
        const documentos = await collection.find().toArray();
        return documentos;
    }
    
    async registrarPartida(killerId, fecha, hora) {
        const db = await connectDB(); 
        const collection = db.collection("Killer");

        try {
            const result = await collection.updateOne(
                { id: killerId },
                {
                    $inc: { numeroDeVeces: 1 },
                    $push: { partidas: { fecha: fecha, hora: hora } }
                }
            );

            if (result.modifiedCount > 0) {
                console.log("Partida registrada correctamente.");
            } else {
                console.log("No se encontró el killer con el ID especificado.");
            }
        } catch (error) {
            console.error("Error al registrar la partida:", error);
        }
    }

    async agregarKiller(nombre) {
        const db = await connectDB();
        const collection = db.collection("Killer");

        try {
            const nuevoKiller = {
                nombre: nombre,
                numeroDeVeces: 0
            };

            const result = await collection.insertOne(nuevoKiller);

            console.log("Killer agregado correctamente:", result.insertedId);
            return result.insertedId; // Devuelve el _id generado automáticamente
        } catch (error) {
            console.error("Error al agregar el killer:", error);
        }
    }
}

module.exports = new GestionDBD();
