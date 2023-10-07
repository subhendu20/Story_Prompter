const mongoose = require('mongoose')
const addorder = new mongoose.Schema({
          Order_id:{
                    type:String,
                    required:true,


          },
          Payment_id:{
                    type:String,
                    required:true,
          },
          signature:{
                    type:String,
                    required:true,

          }
})

const orderdata = new mongoose.model('order', addorder)
module.exports = orderdata;