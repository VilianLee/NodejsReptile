const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

function mdw1 (options) {
    return function(req, res, next){
        console.log(req.body)
        console.log('mdw1')
        next()
    }
}
function mdw2 (req, res, next) {
    console.log('mdw2')
    next()
}

function mdw3 (req, res, next) {
    console.log('mdw3')
    res.end('done')
}

app.use('/',mdw1())

app.use('/user', mdw2)

app.use(mdw3)

app.use((err, req, res) => {
    res.end(err)
})
// app.use(require('./middlewares/auth'))

// app.use((req, res, next) => {
//     console.log("you comming here")
//     res.name = req.query.name
//     next()
// })
// app.use((req, res) => {
//     req.duang = 1
//     res.end(`Holle ${res.name}! Welcome to my express server`)
// })
// app.use((err, req, res) => {
//     res.end(err)
// })

const server = http.createServer(app)

server.listen(8000)

