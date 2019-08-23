module.exports = function auth(req, res, next) {
    const query = req.query
    if (query.name === 'vilian') {
        next()
    } else {
        next('go away')
    }
}