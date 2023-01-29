// const express = require('express');
// const bodyParser = require('body-parser');
// const router = require('./Routers/router');
// const mongoose = require('mongoose')
// const fs = require('fs');

// const hostname = "localhost";
// const port = 8008;

// const app = express();

// app.use(bodyParser.json()); 
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','PATCH','DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type','Authorization');
// next();
// });

// app.get('/video', function(req,res){
    
//     const range = req.headers.range;
//     if(!range){
//         res.status(400).send("Requires Range Header");
//     }

//     const videoPath = './Bigbunny.mp4'
//     const videoSize = fs.statSync('Bigbunny.mp4').size;

//     const CHUNK_SIZE = 10**6;
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize-1);

//     const contentLength = end-start+1;
//     const headers = {
//         "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
//         "Accept-Ranges" : "bytes",
//         "Content-Length" : contentLength,
//         "Content-Type" :"video/mp4"
//     };
    
//     res.writeHead(206, headers);

//     const videoStream = fs.createReadStream(videoPath, { start, end});
//     videoStream.pipe(res);
// });


// app.use('/',router)
// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://127.0.0.1:27017/movies_db', {useNewUrlParser:true, useUnifiedTopology:true})
// .then(client =>{
//     app.listen(port, hostname, ()=>{
//         console.log(`Server is running on http://${hostname}:${port}`);
//     });
// }).catch(err =>{
//     console.log(err);
// })

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/movies_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log(err);
    });

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
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range Header");
    }
    else {
    Movie.findOne({ id: req.params.id })
    .then(movie => {
    if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    }
    else {
    const videoPath = movie.trailer;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 500 * 1024; // 500KB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4"
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
    }
    })
    .catch(err => {
    res.status(500).json({ message: "Error streaming movie", error: err });
    });
    }
    });
    
    //start server
    const hostname = "localhost";
    const port = 8008;
    app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
    });
    
    
