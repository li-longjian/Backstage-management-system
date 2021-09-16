const express= require('express')
const router = express.Router()
const User = require('../db/user')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const privateKey = require('../PrivateKey')
const passport = require('passport')

router.get('/',(req,res)=>{
  console.log(req.body);
  res.header("Access-Control-Allow-Origin","*")
  res.send({'msg':'ok',code:200})
})
//
// router.post('/abc',(req,res)=>{
//   // header('Access-Control-Allow-Origin:*');//允许所有来源访问
//   // header('Access-Control-Allow-Method:POST,GET');//允许访问的方式
//   res.send({'msg':'ok_abc_post',code:200})
// })
/**
 * 注册用户
 */
router.post('/register',(req, res)=>{

  const {name,email,password,identity} = req.body
  User.findOne({email:email})
      .then(user =>{
         if(user){
            return res.status(400).json({msg:'当前邮箱已被注册！'})
          }
         else{
           const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
           let newUser = new User({
             name,
             email,
             password,
             avatar,
             identity
          })
      //加密密码
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if(err) throw err

          newUser.password = hash
          newUser.save()
              .then(user => {
                 res.json(user)
          }).catch(err => console.log(err))
        })
      })
    }

  })

})

/**
 * 用户登录
 */
router.post('/login',(req, res)=>{

  const {email,password} = req.body
  //查找是否存在当前用户
  User.findOne({email}).then(user =>{
    if(!user){
      return res.status(404).json({msg:'用户不存在！'})
    }
    //匹配密码是否一致
    bcrypt.compare(password, user.password, function(err, result) {
      if(!result){
        return res.status(400).json({msg:'密码错误！'})
      }
      // res.json({msg:'success!'})
    //  验证成功
    //  生成一个token并返回
      const rule = {
        name:user.name,
        email:user.email,
        id:user.id,
        identity:user.identity,
        avatar: user.avatar
      }
      jwt.sign(rule, privateKey.key, {expiresIn:"7d"}, function(err, token) {
        if(err) throw err
        token ="Bearer "+token
        res.json({
          token,
          msg:'success'
        })
      });
    });
  })
})

/**
 * 获取所有用户
 */
router.get('/user',(req,res) =>{
  User.find().then(user =>{
    res.json(user)
  })
})
/**
 * 注销用户
 */
router.get('/user/delete/:id',(req,res) =>{
  User.deleteOne({_id: req.params.id}, err => {
    if (err) return res.status(404).json({msg: '删除失败'})
    else res.json({msg: '删除成功'})
  })
})
/**
 * 更新用户信息
 */

/**
 * 修改用户
 */
router.post('/setuser/:id',(req,res)=>{

 let userDate = {};

  if (req.body.email) userDate.email = req.body.email
  if (req.body.name) userDate.name = req.body.name
  if (req.body.identity) userDate.identity = req.body.identity

  User.updateOne({_id: req.params.id}, userDate).then(user => {
    if (user) {
      res.json(user)
    }
  }).catch(err => {
    console.log(err);
  })
})

//通过jwt来验证token
//
// function tokenCheck(req,res,next){
//
//   let token = req.headers.authorization
//   token = token.split(' ')[1]
//   console.log(token);
//   try{
//     let detoken = jwt.verify(token,privateKey.key)
//     // console.log(detoken);
//     next()
//   }
//   catch (e) {
//     res.json({msg:'token没有校验'})
//   }
//
// }

router.get('/current',passport.authenticate("jwt",{session:false}),(req, res)=>{
  res.header("Access-Control-Allow-Origin","*")
    res.json(req.user)

})

// router.get('/music',tokenCheck,(req,res)=>{
//
//
//   res.json({msg:'success'})
// })








module.exports = router