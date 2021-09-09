const express= require('express')
const router = express.Router()
const Message = require('../db/message')
const passport = require('passport')
/**
 * 获取所有的留言信息
 *
 */
router.get('/board',(req,res) =>{
  Message.find().then(mess =>{
    if(!mess){
      return res.status(400).json({msg:'没有任何记录'})
    }
    res.json(mess)
  }).catch(err =>{
    console.log(err);
  })

})

/**
 * 增加一条留言记录   passport.authenticate("jwt",{session:false}),
 */
router.post('/board/add',(req,res)=>{
  let messageData = {}
  if(req.body.type) messageData.type = req.body.type//公司类型
  if(req.body.describe) messageData.describe = req.body.describe//描述 招、投标
  if(req.body.remark) messageData.remark = req.body.remark//备注
  if(req.body.date) messageData.date = req.body.date//时间
  if(req.body.companyName) messageData.companyName = req.body.companyName //公司名称
//保存到数据库
  new Message(messageData).save().then(message => {
    res.json(message)
  }).catch(err => console.log(err))
})


module.exports = router
