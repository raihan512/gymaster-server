const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Connect Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4yec41.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        // Users collection in database
        const users = client.db("gymaster").collection("users");
        // Adduser to database
        app.post('/adduser', async (req, res) => {
            const user = req.body;
            const addUser = await users.insertOne(user);
            res.send(addUser);
        })
        // Get users collection from database
        app.get('/alluser', async (req, res) => {
            const query = {};
            const allUser = await users.find(query).toArray();
            res.send(allUser)
        })
    } finally { }
}
run().catch();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})