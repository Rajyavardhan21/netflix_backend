
const moviesSchema = require('../Models/movies');

exports.getShows = (req,res)=>{
    moviesSchema.find().then(response => {
        const shows = response;
        res.status(200).json({
            message:"Movies/Shows fetched successfully",
            shows: shows
        });
    }).catch(err=>{
        res.status(400).json({error:err})
    });
};

exports.getMovieDetails = (req,res)=>{
    moviesSchema.find().then(response =>{
        const movieDetails = response.filter((item)=>
            item._id == req.params._id
        );
        res.status(200).json({
            message: "Movie details fetched successfully",
            details:movieDetails[1]
        })
    }).catch(err=>{
        res.status(400).json({error:err})
    });   
}

