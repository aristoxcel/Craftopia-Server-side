const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();
require ('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middle ware  connection
app.use(cors());
app.use(express.json());


// xvjJrJSi55rDg0Xx





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kdbwfxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    // await client.connect();
    const craftCollection = client.db('craftDB').collection('craft')
    const catCollection = client.db('FixedDb').collection('catDb')


    app.get('/cat', async(req, res)=>{
      const result = await catCollection.find().toArray()
      res.send(result)
  })

app.get('/craft', async(req, res)=>{
    const result = await craftCollection.find().toArray()
    res.send(result)
})
    
app.post('/craft', async(req, res)=>{
    const craft =req.body;
    console.log(craft)
    const result = await craftCollection.insertOne(req.body)
    res.send(result)
})


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    res.send('this is home page')
})

app.listen(port, ()=>{
    console.log(`port num is: ${port}`);
})