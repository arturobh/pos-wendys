const express = require('express')
const app = express()
const port = 3000

data = {
  type: "burger",
  name: "daves",
  size: "1"
}

app.get('/test', (req, res) => {
  res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  