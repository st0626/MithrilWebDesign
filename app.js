const express = require('express')
const path = require('path')
const port = 3000

const app = express()
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('layout')
})

app.listen(process.env.PORT || 5000)

