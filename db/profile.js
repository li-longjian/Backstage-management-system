const mongoose = require('mongoose')

// 数据库链接
// mongoose.connect('mongodb://localhost:27017/management_system',
//     {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
//   console.log('数据库连接成功');
// }).catch(err => console.log(err));

const Schema = mongoose.Schema

let profile_schema = new Schema({
  type:{
    type:String,

  },
  describe:{
    type:String,

  },
  income:{
    type:String,
    required:true
  },
  expend:{
    type:String,
    required:true
  },
  cash:{
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

let Profile = mongoose.model('Profile',profile_schema)

module.exports = Profile