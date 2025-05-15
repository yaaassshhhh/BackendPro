import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        index : true,
    },
    email : {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName : {
        type: String,
        required: [true, 'fullName is required'],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    avatar : {
        type : String, // cloudinary URL
        required : [true, 'avatar is required'],
    },
    coverImage : {
        type : String, // cloudinary URL
    },
    watchHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Video'
        }
    ],
    password : {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        maxlength: 24,
    },
    refreshToken : {
        type: String,
        default: null,
    }
},{
    timestamps: true,
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
     
    this.password = await bcrypt.hash(this.password, 10);
    next()
})
userSchema.methods.isPasswordCorrect = async () => {
 return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = () => {
 return jwt.sign(
    {
        _id : this._id,
        username : this.username,
        email : this.email,
        fullName : this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : ACCESS_TOKEN_EXPIRY,
    },
 )
}
userSchema.methods.generateRefreshToken = () => {
return jwt.sign(
    {
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
    },
 )
}
export const User = mongoose.model('User', userSchema);