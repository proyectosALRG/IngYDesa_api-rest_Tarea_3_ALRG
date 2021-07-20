const express = require('express');
const router = express.Router();

const Error = require('../models/errores');

router.get('/', async (req,res) => {
    const errore=await Error.find();
//    res.json(errore); Incluido temporalmente para pruebas con Postman
      res.render('index', {
      errore
    });
});



router.post('/guardar', async (req, res) => {
    const error=new Error(req.body);
    await error.save();
//    res.json(error);  Incluido temporalmente para pruebas con Postman    
    res.redirect('/');
    
});

router.get('/editar/:id', async (req, res) =>{
    const {id}=req.params;
    const error= await Error.findById(id);
//    res.json(error); Incluido temporalmente para pruebas con Postman    
    res.render('edit', {
        error
    });
});

    router.post('/editar/:id', async (req, res) =>{
        const {fecha, codigo, descripcion, status}= req.body;
        await Error.findByIdAndUpdate(req.params.id, {fecha, codigo, descripcion, status});
        res.redirect('/');
    }); //Para reescribir los datos en el formulario y que el usuario no deba
        //teclear todo nuevamente, solo corregir el/os campos que necesita modificar

router.get('/borrar/:id', async (req, res) =>{
    const {id}=req.params;
    await Error.remove({_id: id});
//  res.json(id);   Incluido temporalmente para pruebas con Postman    
    res.redirect('/');
});
module.exports = router;