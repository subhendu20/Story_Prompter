const mongoose = require('mongoose')
const newbook = new mongoose.Schema({
          _id: {
                    type: String,
          },

          name: {
                    type:String
          },
          author: {
                    type:String
          },
          
          pages: {
                    type:Number
          },
          image: {
                    type:String
          },
          description: {
                    type:String
          },
          published: {
                    type:String
          },
          publication: {type:String},
          price: {type:Number}
})

const bookdata = new mongoose.model('book', newbook)
module.exports = bookdata;