const express = require('express');
const router = express.Router();
const showsController = require('../Controllers/showsController')

router.get('/shows', showsController.getShows);
router.get('/shows/:_id', showsController.getMovieDetails);
router.get('/shows/:_id/video', function(req,res){
    res.sendFile(__dirname + "/index.html");
});



module.exports = router;
