const express = require('express')
const app = express()
const port = 3050

data = {
  type: "burger",
  name: "daves",
  size: "1"
}

data2 = {
  type: "burger",
  name: "daves",
  size: "2"
}

app.get('/1', (req, res) => {
  res.json(data);
})

app.get('/2', (req, res) => {
  res.json(data2);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  