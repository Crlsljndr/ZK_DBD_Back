const { connectDB } = require('../db/database');
const { ObjectId } = require('mongodb');

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
            return result.insertedId;
        } catch (error) {
            console.error("Error al agregar el killer:", error);
        }
    }

    async eliminarKiller(id) {
        const db = await connectDB();
        const collection = db.collection("Killer");

        try {
            console.log(id);
            const result = await collection.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount > 0) {
                console.log("Killer eliminado correctamente.");
                return { success: true, message: "Killer eliminado correctamente" };
            } else {
                console.log("No se encontró el killer con el ID especificado.");
                return { success: false, message: "No se encontró el killer con el ID especificado" };
            }
        } catch (error) {
            console.error("Error al eliminar el killer:", error);
            return { success: false, message: "Error al eliminar el killer" };
        }
    }

    async editarKiller(id, nuevoNombre) {
        const db = await connectDB();
        const collection = db.collection("Killer");

        // Verificar si el ID es un ObjectId válido
        if (!ObjectId.isValid(id)) {
            console.log("ID no válido");
            return { success: false, message: "ID no válido" };
        }

        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { nombre: nuevoNombre } }
            );

            if (result.modifiedCount > 0) {
                console.log("Nombre del killer editado correctamente.");
                return { success: true, message: "Nombre del killer editado correctamente" };
            } else {
                console.log("No se encontró el killer con el ID especificado.");
                return { success: false, message: "No se encontró el killer con el ID especificado" };
            }
        } catch (error) {
            console.error("Error al editar el nombre del killer:", error);
            return { success: false, message: "Error al editar el nombre del killer" };
        }
    }
}

module.exports = new GestionDBD();
