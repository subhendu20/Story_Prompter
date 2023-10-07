const mongoose = require('mongoose')
const addbook = new mongoose.Schema({
          book_id:{
                    type:String,
                    required:true,


          },
          name:{
                    type:String,
                    required:true,
          },
          image:{
                    type:String,
                    required:true,

          },
          author:{
                    type:String,
                    required:true,


          }
})

const cartdata = new mongoose.model('cart', addbook)
module.exports = cartdata;