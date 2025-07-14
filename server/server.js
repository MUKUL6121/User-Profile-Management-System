const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

var corsoptions = {
    origin: ['http://localhost:5173','https://user-profile-management-system-1.onrender.com/'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    // optionsSuccessStatus: 200
};
app.use(cors(corsoptions));

const { MongoClient } = require('mongodb');
// const client = new MongoClient('mongodb://localhost:27017/');
const client = new MongoClient('mongodb+srv://mukuljangra1111:jA1BVK2fdprhrlgo@test-mycompany.dl8wtzk.mongodb.net/')

async function connectToDB() {
    await client.connect();
    await console.log('Connected successfully to mongoDB');
};

const database = 'user_data';
const collection = 'user_detail';

app.get('/',(req,res)=>{
    res.send('<h2><a href="/users">users</a></h2>')
})
app.get('/users', async (req, res) => {
    try {
        const employees = await client.db(database).collection(collection).find({}).toArray();
        console.log(`someone call ${req.url}`);
        res.json(employees);
    } catch (err) {
        console.log(err);
    }
});

app.get('/user/:id', async (req, res) => {
    const employeeId = +req.params.id;
    try {
        const employees = await client.db(database).collection(collection).find({ eid: employeeId }).toArray();
        res.json(employees);
    } catch (err) {
        console.log(err);
    }
});
app.post('/user', async (req, res) => {
    const payload = req.body;
    try {
        await client.db(database).collection(collection).insertOne(payload);
        res.send('User Added Successfully');
    } catch (err) {
        console.log(err);
    }
});

app.patch('/user/:id', async (req, res) => {
    const employeeId = +req.params.id;
    const payload = req.body;
    try {
        await client.db(database).collection(collection).updateOne({ eid: employeeId }, { $set: payload }, { upsert: true });
        res.send('User Updated Successfully');
    } catch (err) {
        console.log(err);
    }
});

app.delete('/user/:id', async (req, res) => {
    const employeeId = +req.params.id;
    try {
        await client.db(database).collection(collection).deleteOne({ eid: employeeId });
        res.send('User Deleted Successfully');
    } catch (err) {
        console.log(err);
    }
});
app.delete('/users', async (req, res) => {
    try {
        await client.db(database).collection(collection).deleteMany({});
        res.send('All User Deleted Successfully');
    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, async () => {
    await connectToDB();
    await console.log('Server Running on http://localhost:5000/users');
});
