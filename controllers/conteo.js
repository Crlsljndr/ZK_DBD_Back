const { connectDB } = require('../db/database');



async function list() {
    const db = await connectDB();
    const collection = db.collection('Killer');
    const documentos = await collection.find().toArray();
    return documentos;
}


module.exports = { list };


