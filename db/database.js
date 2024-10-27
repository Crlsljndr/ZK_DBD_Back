const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.ts8cixu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("DBD");
        console.log("Conexión exitosa a MongoDB Atlas");
        return db;
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas", error);
    }
}

module.exports = { connectDB };
