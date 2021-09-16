const mongoose = require('mongoose')

const Schema = mongoose.Schema

let bids_schema = new Schema({
  bidsTime: {//投标日期
    type:Date
  },
  number:{//招标项目编号
    type:Number,
    required:true

  },
  LegalName:{//法人姓名
    type:String,
    required:true
  },
  companyName:{//投标单位
    type:String,
    required:true
  },

  phone:{//联系电话
    type:Number,

  },
  productNumber:{//产品批号
    type:String
  },

  bailTotal:{//投标总金额
    type:String
  },
  productionDate:{//生产日期
    type:String,
  },
  validPeriod:{//有效期
    type:String
  },
  paymentDate:{//投标保证金缴款日期
    type:String
  },
  announcer:{//投标信息发布者
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }
})

let Bids = mongoose.model('Bid',bids_schema)

module.exports = Bids