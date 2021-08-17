const express= require('express')
const router = express.Router()
const Profile = require('../db/profile')
const passport = require('passport')


// router.get('/test',(req,res)=>{
//   res.json({msg:'profile'})
// })

/**
 * 增加一条货物记录
 */
router.post('/profile/add',passport.authenticate("jwt",{session:false}),(req,res)=>{

  let profileData = {}
  if(req.body.type) profileData.type = req.body.type
  if(req.body.describe) profileData.describe = req.body.describe
  if(req.body.income) profileData.income = req.body.income
  if(req.body.expend) profileData.expend = req.body.expend
  if(req.body.cash) profileData.cash = req.body.cash
  if(req.body.remark) profileData.remark = req.body.remark
  if(req.body.date) profileData.date = req.body.date


  new Profile(profileData).save().then(profile => {
    res.json(profile)
  })
})

/**
 * 展示表所有的记录
 */
router.get('/profile',passport.authenticate("jwt",{session:false}),(req,res)=>{

  Profile.find().then(profile => {
    if(!profile){
      return res.status(400).json({msg:'没有任何记录'})
    }
    res.json(profile)
  }).catch(err =>{
    console.log(err);
  })
})

/**
 * 根据id查找一条记录
 */

router.get('/profile:id',passport.authenticate("jwt",{session:false}),(req,res)=>{

  Profile.findOne({_id:req.params.id}).then(profile =>{
    if(!profile){
      return res.status(404).json({msg:'没有该条记录'})
    }
    res.json(profile)
  }).catch(err => console.log(err))
})

/**
 * 根据id编辑记录
 */
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{

  let profileData = {}
  if(req.body.type) profileData.type = req.body.type
  if(req.body.describe) profileData.describe = req.body.describe
  if(req.body.income) profileData.income = req.body.income
  if(req.body.expend) profileData.expend = req.body.expend
  if(req.body.cash) profileData.cash = req.body.cash
  if(req.body.remark) profileData.remark = req.body.remark

  Profile.updateOne(
      {_id:req.params.id},
      profileData
      ).then(profile =>{
        res.json(profile)
  })


})

/**
 * 根据id删除数据记录
 */
router.get('/profile/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
    Profile.deleteOne({_id:req.params.id},err =>{
      if(err) return res.status(404).json({msg:'删除失败'})
      else res.json({msg:'删除成功'})
    })
})


module.exports = router