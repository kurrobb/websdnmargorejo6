import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 5000;

const uri = "mongodb+srv://ksyiful:oqFRSDuMzCXyxfR8@nyoba.mcjurx0.mongodb.net/?retryWrites=true&w=majority&appName=nyoba";
const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        const database = client.db("schoolDB");
        return database.collection("students");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

app.get("/students", async (req, res) => {
    try {
        const studentsCollection = await connectToDB();
        const students = await studentsCollection.find().toArray();
        res.json(students);
    } catch (err) {
        res.status(500).send("Error fetching students data");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
