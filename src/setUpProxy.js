const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api/**', {target: `${process.env.REACT_APP}`}))
    app.use(proxy('/auth/**', {target: `${process.env.REACT_APP}`}))
}