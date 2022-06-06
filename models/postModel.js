const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  auther:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"users",
    required:true
  }
});


module.exports = mongoose.model("posts", postSchema);