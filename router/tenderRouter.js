const express= require('express')
const router = express.Router()
const Tender = require('../db/tender')

/**
 * 根据公司名字查找招标记录查询所有招标记录
 */
router.get('/tender',(req,res)=>{
  Tender.find().then(tender =>{
    if(!tender){
      res.json({msg:'招标记录为空！'})
    }
    res.json(tender)
  })
})
/**
 *
 */

/**
 * 增加一条招标记录   passport.authenticate("jwt",{session:false}),
 */
router.post('/tender/add',(req,res)=>{
  let TenderData = {}
  if(req.body.number) TenderData.number = req.body.number
  if(req.body.drugName) TenderData.drugName = req.body.drugName
  if(req.body.companyName) TenderData.companyName = req.body.companyName
  if(req.body.date) TenderData.date = req.body.date
  if(req.body.Package) TenderData.Package = req.body.Package
  if(req.body.Total) TenderData.Total = req.body.Total
  if(req.body.expirationDate) TenderData.expirationDate = req.body.expirationDate
  if(req.body.bail) TenderData.bail = req.body.bail


//保存到数据库
  new Tender(TenderData).save().then(tender => {
    res.json(tender)
  }).catch(err => console.log(err))
})


module.exports = router