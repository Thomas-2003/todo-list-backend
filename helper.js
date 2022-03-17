const jwt = require('jsonwebtoken');
const { secretKey } = require('./authController');

const myLogger = function (req, res, next) {
    const date = new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')
    console.log(`${date} ${req.method} - ${req.originalUrl}`);
    next();
};
const authCheck = (req, res, next) => {
    try {
        const receivedToken = req.headers.authorization.replace("Bearer ", "")
        var decoded = jwt.verify(receivedToken, secretKey);
        next()
    } catch (err) {
        console.log(`JWT ERROR: `, err)
        res.json({ message: "password wrong" })
    }
}
module.exports = { myLogger, authCheck }