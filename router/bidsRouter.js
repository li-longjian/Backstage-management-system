const express= require('express')
const router = express.Router()
const Bids = require('../db/bids')

/**
 * 获取查询所有投标记录
 */
router.get('/bids',(req,res)=>{
  Bids.find().then(bids =>{
    res.json(bids)
  })
})
/**
 * 根据公司名字查询投标记录
 */

/**
 * 增加一条投标信息
 */

router.post('/tender/addBids',(req,res)=>{
  const bidsDate = req.body
  new Bids(bidsDate).save().then(bids =>{
    res.json(bids)
  }).catch(err =>{
    console.log(err);
  })
})


module.exports = router