const router = require('express'.Router);
const Movie = require('../models/Movie.model')



router.get('/movies/create', (req, res, next)=>{
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
        res.redirect('/')
    }
    catch(e){
        res.render('/movies/new-movies');
    }
})

module.exports = router;