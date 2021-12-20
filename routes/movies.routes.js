const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');
const res = require('express/lib/response');

router.get('/movies/create', (req, res)=>{
    res.render('movies/new-movies')
})


router.post('/movies/create', async (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;
    try{
        const movie = await Movie.create({
            title,
            genre,
            plot,
            cast
        });
        res.redirect('/movies')
    }
    catch(e){

    }
})

/* router.post('/movies/create', (req, res)=>{
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
    .then(()=>
        res.redirect('/movies')

    )
    .catch(()=>
    res.render('movies/new-movies'))
}) */

router.get('/movies', (req, res, next)=>{
    Movie.find()
    .then((movies)=>{
        res.render('movies/movies', {movies});  
    })
    .catch(error => {
        next(error);
      })
})

router.get('/movies/:id', (req, res, next)=>{
    const {id} = req.params;
    Movie.findById(id)
    .populate('cast')
    .then((movie)=>{
        res.render('movies/movie-details', {movie})
    })
    .catch(error => {
        next(error);
      })
})

router.post('/movies/:id/delete', (req, res, next)=>{
    const {id} = req.params;
    Movie.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/movies')
    })
      .catch(error => {
      next(error);
    })
})

router.get('movies/:id/edit', (req, res, next)=>{
    const {id} = req.params;
    Movie.findById(id)
    .then((movie)=>{
        Celebrity.find()
    })
    .then(()=>{
        res.render('movies/edit-movie')
    })
    .catch(error => {
        next(error);
    })
})

router.post('movies/:id/edit',(req, res, next)=>{
    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(movie =>{
        res.redirect('/movies')
    })
    .catch(error => {
        next(error);
    })
})

module.exports = router;