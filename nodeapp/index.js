const App = require('express')()
const MongoClient = require('mongodb').MongoClient;


require('dotenv').config()

const PORT = process.env.PORT || 8000
let db = null
let MONGO_URL = process.env.MONGO_URL


if (process.env.NODE_ENV === 'development') {
  MONGO_URL = process.env.MONGO_URL_LOCAL
  console.log('starting development env ...')
}


MongoClient.connect(MONGO_URL, (error, client) => {
  if (error) throw new Error(error)

  console.log('Connect db ok..')
  db = client.db('nodeapp')

})


App.get('/', (req, res) => {
  res.send('setting up project')
  const collection = db.collection('user')

  collection.insertOne({ username: 'gada121982', password: 'nguyenvinhhai' })

})


App.listen(PORT, () => {
  console.log('app listening on port', PORT)
})