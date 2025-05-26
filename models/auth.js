const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'landlords', 'admin'],
      default: 'user',
      required: true,
    },
  }
  ,{
    timestamps:true
  }
);

// UserDetails Schema
const userDetailsSchema = new Schema(
  {
    user_detailsId: {
      type: String,
      unique: true,
    },
    userid: {
      type: String,
      required: true,
      ref: 'User',
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    Phone_no: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    profile_pic_url: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    Zip_code: {
      type: String,
      default: null,
    },
  }
  
);

// Creating Models
const User = model('User', userSchema);
const UserDetails = model('UserDetails', userDetailsSchema);

module.exports = { User, UserDetails };
