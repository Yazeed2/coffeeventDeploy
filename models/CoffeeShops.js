const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeShopSchema = new Schema(
  {
    coffeeName: {
        type:String,
    required:true
},
 location: {
     type:String,
     required:true
 },
 photo: {
     type:String,
     required:true
 },
 description: {
    type:String,
    required:true
 },
 priceHour:{
    type:Number,
required:false
 },
 events:[]},
 

  { timestamps: true }
);




const CoffeeShop = mongoose.model("coffeeShop", CoffeeShopSchema);
module.exports = CoffeeShop;
// "startingTime" : Number,
// "endingTime" : Number,
// "date" : Date,
// "typeOfEvent" : String,
// "price" : Number,
// "accepted" : Boolean,
// "public" : Boolean,
// "eventDescription" : String