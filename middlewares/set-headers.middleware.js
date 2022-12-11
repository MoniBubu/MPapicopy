function setHeadersMiddleware(_, res, next) {
    res.set('Content-Type', 'application/json');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    next();
}

module.exports = { setHeadersMiddleware };