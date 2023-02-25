const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1zdgrcr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)

async function run() {

  try {
    const addCollection = client.db("nature").collection("add");


    // -----------------------------------

    app.post('/addItem', async (req, res) => {
      const query = req.body;
      const result = await addCollection.insertOne(query)
      res.send(result)
    })
    app.get('/items', async (req, res) => {
      const query = { report: false }
      const result = await addCollection.find(query).toArray()
      res.send(result)
    }); 

    app.patch('/like/:id', async (req, res) => {
      const id = new ObjectId(req.params.id)
      const filter = { _id: id }
      const doc ={
        $set:{
          like:true,
        }
      }
      const updateLike = await addCollection.updateOne(filter,  doc)
      res.send(updateLike)
    })
    app.patch('/report/:id', async (req, res) => {
      const id = new ObjectId(req.params.id)
      const filter = { _id: id }
      const doc ={
        $set:{
          report:true,
        }
      }
      const updateLike = await addCollection.updateOne(filter,  doc)
      res.send(updateLike)
    })
    app.get('/reports', async (req, res) => {
      const query = { report: true }
      const result = await addCollection.find(query).toArray()
      res.send(result)
    });
    app.get('/likes', async (req, res) => {
      const query = { like: true }
      const result = await addCollection.find(query).toArray()
      res.send(result)
    });


  }
  finally {

  }

}

run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})














