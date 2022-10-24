const express = require('express')
const path = require('path')
const nodeMailer = require('nodemailer')
require("dotenv").config()

const port = process.env.PORT || 3000

const app = express()


app.use(express.urlencoded({extended: true}))

async function mainMail(name, email, subject, message){
    const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.PASSWORD,
        }
    })
    const mailOption = {
        from: process.env.GMAIL_USER,
        to: process.env.EMAIL,
        subject: subject,
        html: `You got a message from
        Email: ${email}
        Name: ${name}
        Message: ${message}`,
    }
    try{
        await transporter.sendMail(mailOption)
        return Promise.resolve("Message sent successfully")
    } catch (error) {
        return Promise.reject(error)
    }
}

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('layout')
})

app.post('/', async (req,res,next) => {
    const {yourname, youremail, yoursubject, yourmessage} = req.body
    try {
        await mainMail(yourname, youremail, yoursubject, yourmessage)

        res.send('message successfully sent!')
    } catch (error) {
        res.send("Message could not be sent")
    }
})

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})
