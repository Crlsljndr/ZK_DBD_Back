const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://user_01:user_01@cluster0.ts8cixu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("DBD");
        return db;
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas", error);
    }
}

module.exports = { connectDB };
