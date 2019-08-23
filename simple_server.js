const http = require('http')
const server = http.createServer()
const qs = require('querystring')

server.listen(8808)

const users =[]

server.on('request', (req, res) => {
    const url = req.url
    const path = url.indexOf('?') > -1 ? url.substr(1, url.indexOf('?')) : url.substr(1, url.length) 
    const queryString = url.indexOf('?') > -1 ? url.substr(url.indexOf('?') + 1, url.length) : {}
    const query = qs.parse(queryString)

    switch (path) {
        case 'user':
            switch (req.method) {
                case 'GET':
                    res.statusCode = 200
                    res.end(JSON.stringify(users))
                    break;
                case 'POST':
                    const user = {name: Math.floor(Math.random() * 100)}
                    users.push(user)
                    res.statusCode = 200
                    res.end(JSON.stringify(users))
                    break;
                default:
                    res.statusCode = 404
                    break;
            }
            break;

        default:
            break;
    }
})

const url = ""