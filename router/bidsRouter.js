const express= require('express')
const router = express.Router()
const Bids = require('../db/bids')
/**
 * 投标相关接口
 */


/**
 * 获取查询所有投标记录
 */
router.get('/bids',(req,res)=>{
  Bids.find().then(bids =>{
    res.json(bids)
  })
})
/**
 * 根据发布者id查询投标记录
 */
router.get('/bids/:id',(req,res)=>{
  Bids.find({announcer:req.params.id}).then(ret =>{
    res.json(ret)
  }).catch(err =>{
    console.log(err);
  })
})
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

/**
 * 根据id删除投标信息
 *
 */
router.get('/bids/delete/:id',(req,res)=>{
  Bids.deleteOne({_id: req.params.id}, err => {
    if (err) return res.status(404).json({msg: '删除失败'})
    else res.json({msg: '删除成功'})
  })
})

/**
 * 根据id 更新投标信息
 */

router.post('/bids/edit/:id',(req,res)=>{
  const update = req.body

  Bids.updateOne({_id:req.params.id},update).then(ret =>{
    res.json(ret)
  }).catch(err => console.log(err))

})

module.exports = router