const express = require("express");
// const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const events  = require('./routes/events')
const cors = require('cors')
const PORT = process.env.PORT;

const user = require('./routes/user')
const admin = require('./routes/admin')

// app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())


app.use('/events', events)


mongoose.connect(
  process.env.DEV_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoDB");
  }
);

app.use('/users', user)
app.use('/users/userId/events', events)
app.use('/admin',admin)

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));
    const path = require('path');
    app.get("/*", (req,res) =>  {
      res.sendFile(path.resolve(__dirname,'build','index.html'));
    })
  }

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => console.log("express running in "+PORT));
