const express = require('express')
const router = express.Router()
const CoffeeShops = require("../models/CoffeeShops")
const Events = require('../models/Events')
const Users = require('../models/User')
const jwt = require('jsonwebtoken')

// create event test





router.post('/create', (req,res)=>{
    Events.create(req.body)
    .then(thing => res.json({msg:req.body}))
    .catch(err=> res.json(err))
    // CoffeeShops.findOne({coffeeName: req.body.coffeeShop} )
    // .then(data => {
    //     let events = data.events

    //     events = events.push(req.body)
    //     console.log(req.body.evnts)
    //     CoffeeShops.findByIdAndUpdate(data._id,{ $push : {events: req.body.evnts}})
    //     .then(somethings=> res.json(somethings))
    //     .catch(err => res.send(err))
    // })
    // .catch(err=>res.send(err))
})



//      amz7
// router.post('/create/:token', (req,res)=>{ 
//     Events.create(req.body)
//     .then(thing => {
//         var decoded = jwt.verify(req.params.token, 'secret')
//         console.log(decoded);       
//         Users.findOne({_id: decoded._id})
//         .then((data) => {           
//             console.log('evenXts');
//             console.log('evXXents');           
//             Users.findByIdAndUpdate(decoded._id,{ $push : {createdEvents:'supp?'}})
//             .then(somethings=> {
//                 console.log('dooonnene'); 
//                 console.log(somethings);               
//                 res.send('somethings')
//             }
//                 )
//             .catch(err => res.send(err))
//         })
//         .catch(err=>res.send(err))
//        })
//     .catch(err=> res.json(err))

   
// })

//create the coffee shop 
router.post('/coffeShop', (req, res)=>{
    let shop = {
        coffeeName: req.body.coffeeName,
        location:req.body.location,
        photo:req.body.photo,
        description:req.body.description,
        priceHour:req.body.priceHour,
        events:req.body.events
    }
    CoffeeShops.create(shop)
    .then(something => res.send(shop))
    .catch(err => res.send(err))
    


})
router.get('/coffeShop', (req, res)=>{
    CoffeeShops.find()
    .then(data => res.send(data))
    .catch(err=>res.send(err))
})



// find event by id
//it does not wrok for know 
router.get('private/:id',(req, res)=>{
    Events.findById({_id:req.params.id})
    .then(data => res.send(data))
    .catch(err => res.send(err))
})


//gets all the data
router.get('/',(req, res)=>{
    Events.find()
    .then(data => res.send(data))
    .catch(err => res.send(err))
})

router.post('/change/:id', (req, res)=>{
    Events.findByIdAndUpdate(req.params.id , req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err))
})

//delete event by id 
router.get('/delete/:id', (req, res)=>{
    Events.findByIdAndDelete(req.params.id)
    .then(data => res.send(data+'deleted'))
    .catch(err => res.send(err))
})


module.exports = router;
