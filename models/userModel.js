const mongoose = require('mongoose');
const { postModel } = require("./postModel");

const userSchema = mongoose.Schema({
  fullName:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  posts:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:"posts"
    }
  ]
});

module.exports = mongoose.model("users", userSchema);