const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    _id : {
        type:String,
        required:true
    },
    rank:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    trailer:{
        type:String,
        required:true
    },
    genre:[{
        type:String,
        required:true
    }],
    director:[{
        type:String,
        required:true
    }],
    writers:[{
        type:String,
        required:true
    }],
    imdbid:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('movies',moviesSchema,'movies');