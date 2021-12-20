const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next)=>{
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', async (req, res, next)=>{
    const {name, occupation, catchPhrase} = req.body;
    try{
        await Celebrity.create({
            name,
            occupation,
            catchPhrase
        });
        res.redirect('celebrities')
    }
    catch(e){
        res.render('celebrities/new-celebrity');
    }
})

router.get('/celebrities',  (req, res, next)=>{
    Celebrity.find()
    .then((celebrities)=>{
        res.render('celebrities/celebrities', {celebrities})
    })
})

module.exports = router;