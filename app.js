const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/query-1', Controller.query1)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})