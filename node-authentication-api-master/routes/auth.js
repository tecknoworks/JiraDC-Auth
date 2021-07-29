const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

const middleware = require('../middlewares')

router.post('/signup', (req, res) => {
    console.log("merge22")
    console.log(req.body.password)
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) 
        res.status(501).json(error)
        else {
            const newUser =  User({email: req.body.email, password: hash})
            console.log(newUser)
            newUser.save()
                .then(user => {
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(error => {
                    res.status(511).json(error)
                })
        }
    })
});

router.post('/signin', (req, res) => {
    console.log("merge22")
    console.log(req.body.password)
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) 
        res.status(501).json(error)
        else {
            const newUser =  User({email: req.body.email, password: hash})
            console.log(newUser)
            newUser.save()
                .then(user => {
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(error => {
                    res.status(511).json(error)
                })
        }
    })
});

router.get('/jwt-test', middleware.verify , (req, res) => {
    res.status(200).json(req.user)
})

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

module.exports = router
