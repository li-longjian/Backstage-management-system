const mongoose = require('mongoose')

//数据库链接
mongoose.connect('mongodb://localhost:27017/DrugBiddingSystem',
    {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('数据库连接成功');
}).catch(err => console.log(err));

const Schema = mongoose.Schema

let user_schema = new Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  avatar:{
    type:String,

  },
  identity:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default : Date.now
  },
})

let User = mongoose.model('User',user_schema)

module.exports = User