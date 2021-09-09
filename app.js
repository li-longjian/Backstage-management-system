const express= require('express')

const app = express()

const userRouter = require('./router/userRouter')
const profileRouter = require('./router/profileRouter')
const messageRouter = require('./router/messageRouter')
const tenderRouter = require('./router/tenderRouter')
const bidsRouter = require('./router/bidsRouter')

const bodyParser = require('body-parser')

const cors = require('cors')

const passport = require('passport')
// 配置body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

//初始化passport
app.use(passport.initialize())
require('./config/passport')(passport)



app.use(userRouter)
app.use(profileRouter)
app.use(messageRouter)
app.use(tenderRouter)
app.use(bidsRouter)


app.listen(3000,()=>{
  console.log('http://localhost:3000/');
})