const express=require('express');
const router=express.Router();

const User=require('../models/User');
const passport=require('passport');

router.get('/users/signin', (req,res) => {
    console.log(req.body);
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    //successRedirect: '/index',
    successRedirect: '/',
    failureRedirect: '/users/signin',
    //failureFlash: true
}));

router.get('/users/signup', (req,res) => {
    console.log(req.body);
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) => {
const {name, email, password, confirm_password} = req.body;
console.log(name, email, password, confirm_password);    
const errors=[];
if (password!=confirm_password) {
    errors.push({text: 'Password no coincide'});
}
if (password.length<4) {
    errors.push({text: 'Password debe ser de por lo menos 4 caracteres'});
}
if (errors.length>0) {
    //res.render('users/signup', {name,email,password,confirm_password});
    res.send('Datos invalidos, volver a intentarlo en la página de registro');
}else {
    const newUser=new User({name, email, password});
    newUser.password=await newUser.encryptPassword(password);
    await newUser.save();
    res.redirect('/users/signin');
}
});


module.exports=router;