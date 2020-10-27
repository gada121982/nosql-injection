const bodyParser = require('body-parser');
const app = require('express')()

require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.NODE_ENV === 'development' ? process.env.MONGO_URL_LOCAL : process.env.MONGO_URL
let db = null


MongoClient.connect(MONGO_URL, (error, client) => {
  if (error) throw new Error(error)
  console.log('Connect db ok..')
  db = client.db('nodeapp')
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// {"$ne": 2}

app.post('/login', async (req, res) => {
  let { username, password } = req.body

  const collection = db.collection('user')

  let query = {
    username: '',
    password: ''
  }
  try {
    query = {
      username: JSON.parse(username),
      password: JSON.parse(password)
    }

  } catch (e) {
    console.log('error parser username')

  }

  console.log('Câu query', query)

  try {
    await collection.findOne(query, (err, doc) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('Data query được', doc)
      if (doc) {
        res.send({
          token: 'Thisisyourtoken,goodjob'
        })
        return
      }

      res.send({ status: false, message: 'username password not correct :))' })
    })
  } catch (e) {

    res.send({ status: false, message: 'username password not correct :))' })
  }
})


app.get('/register', (req, res) => {
  const collection = db.collection('user')
  res.send('add user thanh cong')
  collection.insertOne({ username: 'gada121983', password: 'nguyenvinhhai' })
})


app.listen(PORT, () => {
  console.log('app listening on port', PORT)
})