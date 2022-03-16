const { mongoose } = require('./index')
const User = mongoose.model('User', { username: String, email: String, password: String });

const getUsers = (req, res) => {
    //TODO check if user exists by email
    //TODO Check if password is the same as in DB
    //TODO create JWT session token
    //TODO respond token to client
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            if (user.password === req.body.password) {
                //TODO generate JWT session token
                res.json({ token: "234kdlsfjdklsf" })
            } else {
                res.json({ error: "password incorrect" })
            }
        } else {
            res.json({ error: "email not found" })
        }
    })
}
module.exports = { getUsers }