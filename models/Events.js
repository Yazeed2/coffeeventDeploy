const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema(
  {
    startingTime: {
        type:String,
    required:false
},
 endingTime: {
     type:String,
     required:false
 },
 photo: {
     type:String,
     required:false
 },
 description: {
    type:String,
    required:false
 },
 typeOfEvent:{
    type:String,
required:false
 },
 price:{
    type:String,
required:false
 },
 public:{
    type:Boolean,
required:false
 }, 
 accepted:{
    type:Boolean,
required:false
 },

 name:{
    type:String,
required:false
 },
 coffeeShopName:{
    type:String,
required:false
 },
 capacity:{
     type:String,
     required:false
 },
 date:{
     type:Date,
     required:false
 },
 thingsEvent:{
     type:String,
     required:false
 },
 options:{
     type:String,
     required:false
 },
 priOrpub:{
     type:String,
     required:false
 },
  userId:{
    type:String,
    required:false
}



},
 

  { timestamps: true }
);




const Events = mongoose.model("Event", Event);
module.exports = Events;
