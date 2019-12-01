// @github_bosheca
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


process.env.SECRET_KEY = 'secret'
// rigister steps (1-regist)
router.post('/register', (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(newUser)
    // Search if email is exist or not
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            // if email not exist
            if (!user) {
                // hashing step
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    newUser.password = hash
                    //create the user
                    User.create(newUser)
                        .then(user => res.send("user created" + newUser.email))
                        .catch(err => res.send(err))
                })
            }
            // if email is exist
            else {
                res.send(`email is already used`)
            }
        })
        .catch(err => res.send(err))
})

// Login steps (1-login) 
router.post('/login', (req, res) => {
    //check email is exist or not
    //
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            // if email is exist
            
            if (user) {

                if (bcrypt.compareSync(req.body.password, user.password)) {

                    user.password = "" //  "" we don't want password to appear
                    var paylod = {
                        user
                    }
                    let token = jwt.sign(paylod, 'secret', {
                        expiresIn: 60*60*24*365
                    })
                    res.send(token)
                }
                // if password not the same
                else {
                    res.json({msg :"Password is not currect"})
                }
            } else {
                // if email not exist
                console.log("yess")
                res.json({msg:"email is not found"})
            }
        })
        .catch(err => res.send(err))
})

// change the passwoer 

router.post('/changepassword/:token' , (req , res)=>{
    
// newPassword

    var decoded = jwt.verify(req.params.token, 'secret')
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        var password = hash
        User.findByIdAndUpdate(decoded.user._id , {password:password  }  )
        .then(user => res.send({msg :`the password has change `  , user :user}))
        .catch(err => res.send(err))
    })
 

})

//book event

router.post('/book/:token',(req,res)=>{
    var decoded = jwt.verify(req.params.token, 'secret')
console.log(decoded.user._id);
 User.findByIdAndUpdate(decoded.user._id, { $push : {createdEvents:req.body}})
 .then(data => console.log(data))
 .catch(err=>res.send(err))
})


//gets booked events 
router.get('/data/:id', (req,res)=>{
    User.findById(req.params.id)
    .then(data => res.send(data.createdEvents))
    .catch(err => console.log(err))
})


//return

router.post('/return/:id',(req,res)=>{
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, {createdEvents: req.body})
    .then(data => console.log(data))
    .catch(err=> res.send(err))
})


// get all user 
router.get('/alluser' , (req , res)=>{

    User.find()
    .then(users => res.json(users))
    .catch(err => res.send(err))
} )




module.exports = router