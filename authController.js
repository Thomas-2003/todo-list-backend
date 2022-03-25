const nodemailer = require('nodemailer');
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working
const { uuid } = require('uuidv4');
const { mongoose } = require('./index')
const User = mongoose.model('User', { username: String, email: String, password: String, username: String, balance: Number, verificationToken: String, verifiedAt: Date });
var jwt = require('jsonwebtoken');
const secretKey = "4$23689h2@3238!r923f#h"
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = (req, res) => {
    //TODO check if user exists by email
    //TODO Check if password is the same as in DB
    //TODO create JWT session token
    //TODO respond token to client
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {

                if (result) {
                    //TODO generate JWT session token
                    var token = jwt.sign({ email: req.body.email }, secretKey);
                    res.json({ token: token })
                } else {
                    res.json({ error: "password incorrect" })
                }
            })
        } else {
            res.json({ error: "email not found" })
        }

    })
}
const register = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                const verificationToken = uuid()
                // Store hash in your password DB.
                const createdUser = User.create({
                    email: req.body.email,
                    password: hash,
                    username: req.body.username,
                    balance: req.body.balance,
                    verificationToken: verificationToken
                }).then(success => {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: 'fraankrr@gmail.com',
                            pass: process.env.GMAILPASSWORD
                        }
                    });

                    var mailOptions = {
                        from: 'somerealemail@gmail.com',
                        to: req.body.email,
                        subject: 'Sending Email using Node.js[nodemailer]',
                        html: "click to <a href='http://localhost:4000/verify/" + verificationToken + "'>here</a>"
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json({ message: "User created" })
                        }
                    });
                })
            });
        } else {
            res.status(409).json({ error: "you alraedy registered" })
        }
    })
}
const verify = (req, res) => {
    User.findOne({ verificationToken: req.params.uuid }).then(user => {
        if (user) {
            user.verifiedAt = new Date()
            user.save(function (result) {
                res.json({ message: "User verified succesfully" })
            })
        } else {
            res.status(404).json({ error: "email not found" })
        }
    })
}

const deleteToDo = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            user.remove(function (result) {
                res.json({ message: "User delete succesfully" })
            })
        } else {
            res.status(404).json({ error: "email not found" })
        }
    })
}
const edit = (req, res) => {
    User.findOne({ email: req.body.email }).then(async user => {
        if (user) {

            if (/\w{2,20}/.test(req.body.username)) {
                console.log("username");
                user.username = req.body.username
            }
            else {
                console.log("invalide");
            }
            user.balance = req.body.balance
            user.email = req.body.email

            try {
                await user.save()
                res.json({ message: "User edit succesfully" })

            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(404).json({ error: "email not found" })
        }
    })
}
module.exports = { login, secretKey, register, deleteToDo, edit, verify }