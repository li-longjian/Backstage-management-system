const mongoose = require('mongoose')

const Schema = mongoose.Schema

let message_schema = new Schema({
  type:{
    type:String,

  },
  describe:{
    type:String,
  },
  companyName:{
    type:String,
    required:true
  },

  remark:{
    type:String,

  },
  date:{
    type:Date,
    default:Date.now
  }
})

let Message = mongoose.model('Message',message_schema)

module.exports = Message