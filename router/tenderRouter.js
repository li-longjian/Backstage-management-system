const express= require('express')
const router = express.Router()
const Tender = require('../db/tender')

/**
 * 查询所有招标记录
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
 * 修改数据库数据:招标信息修改
 */
router.post('/tender/edit/:id',(req,res) =>{

  let editDate = {};
  if(req.body.number) editDate.number = req.body.number
  if(req.body.drugName) editDate.drugName = req.body.drugName
  if(req.body.companyName) editDate.companyName = req.body.companyName
  if(req.body.date) editDate.date = req.body.date
  if(req.body.Package) editDate.Package = req.body.Package
  if(req.body.Total) editDate.Total = req.body.Total
  if(req.body.expirationDate) editDate.expirationDate = req.body.expirationDate
  if(req.body.bail) editDate.bail = req.body.bail
  if(req.body.announcer) editDate.announcer = req.body.announcer
  Tender.updateOne({_id:req.params.id},editDate).then(tender =>{
    res.json(tender)
  })
})
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
  if(req.body.announcer) TenderData.announcer = req.body.announcer

//保存到数据库
  new Tender(TenderData).save().then(tender => {
    res.json(tender)
  }).catch(err => console.log(err))
})

/**
 * 删除一条信息记录
 */
router.get('/tender/delete/:id',(req,res) => {
  Tender.deleteOne({_id: req.params.id}, err => {
    if (err) return res.status(404).json({msg: '删除失败'})
    else res.json({msg: '删除成功'})
  })
})
/**
 * 根据发布者id查询所有招标记录
 */
router.get('/tender/:id',(req,res) =>{
  Tender.find({announcer:req.params.id}).then(tender =>{
    res.json(tender)
  }).catch(err =>{
    console.log(err);
  })
})

module.exports = router