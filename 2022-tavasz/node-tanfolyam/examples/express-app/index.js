const express = require('express')
const app = express()
const port = 3000

const hello = (req, res, next) => {
  req.data = `Hello, ${req.params.name}, `
  next()
}

const render = (req, res) => {
  res.send(`${req.data} this is the JS World!`)
}

app.get('/:name', hello, render)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
