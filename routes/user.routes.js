const express=require('express');
const router=express.Router();
const userModel=require('../models/user.model')
const { body, validationResult } = require('express-validator');


const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.get('/test',(req,res)=>{
    res.send('user Test Route');
})
router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:13}),
body('password').trim().isLength({min:5}),
body('username').trim().isLength({min:3}),
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({
        erros:errors.array(),
        message:'invalid Data'
       })
    }
    const{email,username,password}=req.body;
    const hashpassword=await bcrypt.hash(password,10)
    const newUser=await userModel.create({
        email,username,password:hashpassword
    })
    res.redirect('/user/login');
}
    )
router.get('/login', (req, res) => {
    res.render('login'); // or res.send('Login page')
});

router.post('/login',body('username').trim().isLength({min:3}),
body('password').trim().isLength({min:2}),
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
        errors :errors.array(),
        message :'Invalid Data'
        })
    }
    const {username,password}=req.body;
    const user=await userModel.findOne({
        username:username
    })
    if(!user){
        return res.status(400).json({
            message:"no username "
        })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            message:'username or password is incorrect'
        })
    }
    const token=jwt.sign({
        userId:user._id,
        email:user.email,
        username:user.username
    },
    process.env.JWT_SECRET)
    res.cookie('token',token)
    res.redirect('/home')
    

}

)

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/user/login');
});
    
    

module.exports=router;