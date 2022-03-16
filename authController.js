const { mongoose } = require('./index')
const User = mongoose.model('User', { username: String, email: String, password: String });

const getUsers = (req, res) => {
    User.find().then(user => {
        res.json(user)
    })
}
module.exports = { getUsers }