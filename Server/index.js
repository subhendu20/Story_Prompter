const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const middleware = require('body-parser')
const userLog = require('./Router/Userlog')
const storyLog = require('./Router/StoryLog')
const app = express()
// ---------------------------------------------database connection------------------------------------------//
mongoose.connect(process.env.DB,{
          useNewUrlParser:true,
          
          useUnifiedTopology:true
}).then(()=>{
          console.log('connected')
}).catch((e)=>{
          console.log(e)
})

// -------------------------------------------------middleware------------------------------------------------//
app.use(middleware.urlencoded({ extended: false }));
app.use(middleware.json());
app.use('/auth',userLog)
app.use('/story',storyLog)



app.listen(process.env.PORT,()=>{
          console.log(`port running at ${process.env.PORT}`)
})