function setHeadersMiddleware(_, res, next) {
    res.set('Content-Type', 'application/json');
    next();
}

module.exports = { setHeadersMiddleware };