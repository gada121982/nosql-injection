const PORT = process.env.PORT || 8000
const app = require('express')()
require('dotenv').config()


app.get('/', (req, res) => {
  res.send('setting up project')
})


app.listen(PORT, () => {
  console.log('app listening on port', PORT)
})