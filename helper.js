const myLogger = function (req, res, next) {
    const date = new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')
    console.log(`${date} ${req.method} - ${req.originalUrl}`);
    next();
};
const authCheck = (req, res, next) => {
    if (req.headers.authorization === "hawai123") {
        next()
    } else {
        res.json({ message: "password wrong" })
    }
}
module.exports = { myLogger, authCheck }