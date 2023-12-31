const mongoose = require('mongoose')
const newstory = new mongoose.Schema({
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

const storydata = new mongoose.model('story', newstory)
module.exports = storydata;