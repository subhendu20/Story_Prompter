const express = require('express')
const router = express.Router()
const cors = require('cors')
const user = require('../Schema/Users')
const auth = require('bcryptjs')
const dotenv = require('dotenv').config()
const JWT = require('jsonwebtoken')
const cookie = require("cookie-parser")
const jwtoken = process.env.TOKEN




router.use(cookie())
router.use(cors({
          origin: 'http://127.0.0.1:5173',
          methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
          credentials: true
}))

//-------------------------------------------sign up-------------------------------------------------------------//
router.post('/signup', async (req, res) => {

          try {
                    const a = await user.findOne({ email })
                    if(a){
                              return res.status(500).send('Email already exist!')
                    }
                    const { email, firstName, lastName, password } = req.body
                    const salt = await auth.genSaltSync(11)
                    const encryptpass = await auth.hashSync(password, salt)


                    const newuser = await new user({
                              name: firstName + " " + lastName,
                              email,
                              password: encryptpass
                    })

                    newuser.save().then(() => {
                       
                              res.send(newuser)
                    }).catch((e) => {
                              console.log(e)
                    })







          } catch (error) {
                    res.send(error)

          }



})



//----------------------------------------log in-------------------------------------------------------------//
router.post('/login', async (req, res) => {




          const { email, password } = req.body
          const a = await user.findOne({ email })




          if (!a) {
                    return res.status(400).send("invalid Credentials")
          }
          const passwordcheck = await auth.compare(password, a.password)

          if (!passwordcheck) {
                    return res.status(400).send("invalid pasword")
          }

          const cookie = await JWT.sign(a.id, jwtoken)
          



          res.cookie("signintoken", cookie, { httpOnly: true, secure: true,sameSite:'None' }).send(a._id);















})



























module.exports = router;