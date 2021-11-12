const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    model :{
        type: String,
        required : [true,'Please add a model name'],
        trim : true,
        unique : true
    },
    mpg :{
        type: Number,
        required : [true,'Please add mpg'],
        trim : true
    },
    cyl :{
        type: Number,
        required : [true,'Please add cyl'],
        trim : true,
    },
    disp :{
        type: Number,
        required : [true,'Please add disp'],
        trim : true,
    },
    hp :{
        type: Number,
        required : [true,'Please add hp'],
        trim : true,
    },
    drat :{
        type: Number,
        required : [true,'Please add drat'],
        trim : true,
    },
    wt :{
        type: Number,
        required : [true,'Please add wt'],
        trim : true,
    },
    qsec :{
        type: Number,
        required : [true,'Please add qsec'],
        trim : true,
    },
    vs :{
        type: Number,
        required : [true,'Please add vs'],
        trim : true,
    },
    am :{
        type: Number,
        required : [true,'Please add am'],
        trim : true,
    },
    gear :{
        type: Number,
        required : [true,'Please add gear'],
        trim : true,
    },
    carb :{
        type: Number,
        required : [true,'Please add carb'],
        trim : true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt :{
        type : Date,
        default : new Date()
    }
},{timestamps:true})

module.exports = mongoose.model('Car',CarSchema)