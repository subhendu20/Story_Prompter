const mongoose = require('mongoose')
const newsbook = new mongoose.Schema({
          userId: {
                    type: String,
                    required: true
          },
          username:{
                    type:String,
                    required:true

          },
          body: {
                    type: String,
                    required: true
          }
          ,upVote: {
                    type: [String]
          }
          ,keyword:{
                    type:[String]
          }
})

const bookdata = new mongoose.model('book', book)
module.exports = bookdata;