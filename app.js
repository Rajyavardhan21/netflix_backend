const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();
app.use(bodyParser.json());

//connect to MongoDB

const mongoose = require('mongoose')

const url = 'mongodb+srv://miniprojectfour:me2ciDtJCkbgVCMJ@cluster0.xxiuhto.mongodb.net/movies_db?retryWrites=true&w=majority';

const connectionParams={
    useNewUrlParser: true,
   
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

//define movie schema
const movieSchema = new mongoose.Schema({
    rank: Number,
    title: String,
    thumbnail: String,
    rating: String,
    id: String,
    year: Number,
    image: String,
    description: String,
    trailer: String,
    genre: [String],
    director: [String],
    writers: [String],
    imdbid: String
});

//create Movie model
const Movie = mongoose.model("Movie", movieSchema);

//fetch list of movies
app.get('/movies', (req, res) => {
    Movie.find()
        .then(movies => {
            res.status(200).json(movies);
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching movies", error: err });
        });
});

//fetch movie details
app.get('/movies/:id', (req, res) => {
    Movie.findOne({ id: req.params.id })
        .then(movie => {
            if (!movie) {
                res.status(404).json({ message: "Movie not found" });
            }
            else {
                res.status(200).json(movie);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching movie details", error: err });
        });
});

//stream movie
app.get('/movies/stream/:id', (req, res) => {
    
    Movie.findOne({ id: req.params.id })
    .then(movie => {
    if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    }
    
    else {
            res.status(200).json(movie.trailer);
        
    }
    })
    .catch(err => {
    res.status(500).json({ message: "Error streaming movie", error: err });
    });
    
    });
    
    //start server
    const hostname = "localhost";
    const port = 8008;
    app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
    });
