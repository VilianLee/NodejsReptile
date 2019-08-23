const http = require('http')
const server = http.createServer()
const qs = require('querystring')
const fs = require('fs')

server.listen(8808)

const users = []

server.on('request', (req, res) => {
    const url = req.url
    const path = url.indexOf('?') > -1 ? url.substr(0, url.indexOf('?')) : url
    const queryString = url.indexOf('?') > -1 ? url.substr(url.indexOf('?') + 1, url.length) : {}
    const query = qs.parse(queryString)
    console.log(path)
    switch (path) {
        case '/user':
            switch (req.method) {
                case 'GET':
                    res.statusCode = 200
                    res.end(JSON.stringify(users))
                    break;
                case 'POST':
                    // const contentType = req.headers['content-type']
                    // if(contentType !== 'application/json'){
                    //     res.statusCode = 400
                    //     res.end("error")
                    // }
                    let reqBodyString = ''
                    req.on('data', function (data) {
                        reqBodyString += data.toString()
                    })
                    req.on('end', function () {
                        const user = qs.parse(reqBodyString)
                        users.push(user)
                        res.statusCode = 200
                        res.end(JSON.stringify(users))
                    })

                    break;
                default:
                    res.statusCode = 404
                    break;
            }
            break;
        case "/test.html":
            res.statusCode = 200
            fs.createReadStream('./test.html').pipe(res)
            break
        default:
            res.statusCode = 404
            res.end("NOT FOUND")
            break;
    }
})
