const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const express = require("express");

const mongoose = require('mongoose')

// databases: [mongoose],

AdminBro.registerAdapter(AdminBroMongoose);


const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    logo: 'https://i.imgur.com/eFCHtTt.png',
    companyName: 'Unicorn'
  },
  // resources: [{
  //   resource: "database section name",
  //   options:{
  //     parent:{
  //       name: 'Admin Content',
  //       icon: 'fas fa-cogs',
  //     },
  //     properties:{
  //       description:{
  //         type: 'richtext',
  //       },
        
  //     },
  //   },
  // }],
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@unicorn.com',
  password: process.env.ADMIN_PASSWORD || 'adminpower',

}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'secret-password-for-a-cookie-in-browser',
  //async authenticate function. Its better to defind an 
  //admin in our database and authenticate it with encryped password 
  //but we will do this for now to simplify things
  authenticate: async(email, password) => {
    if(email == ADMIN.email && password == ADMIN.password){
      return ADMIN
    }else{
      return null
    }
  }
})


module.exports = router