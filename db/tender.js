const mongoose = require('mongoose')

const Schema = mongoose.Schema

let tender_schema = new Schema({
  number:{//招标项目编号
    type:Number,
    required:true

  },
  drugName:{//药品名称
    type:String,
    required:true
  },
  companyName:{//制药单位
    type:String,
    required:true
  },

  Package:{//包装要求
    type:String,

  },
  Total:{//总量
    type:String
  },
  expirationDate:{//招标截止日期
    type:String
  },
  bail:{//投标保证金
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }
})

let Tender = mongoose.model('Tender',tender_schema)

module.exports = Tender