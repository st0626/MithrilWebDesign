const express = require('express')
const path = require('path')
const nodeMailer = require('nodemailer')

const port = process.env.PORT || 8080

const app = express()





app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('layout')
})



app.listen(port, () => console.log('Application is running'))
