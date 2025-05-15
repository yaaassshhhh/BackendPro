import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minlength: 3,
        maxlength: 100,
        index : true,
    },
    videoFile : {
        type : String, // cloudinary URL
        required : [true, 'videoFile is required'],
    },
    thumbnail : {
        type : String, // cloudinary URL
        required : [true, 'thumbnail is required'],
    },
    description : {
        type: String,
        required: [true, 'description is required'],
        trim: true,
        minlength: 3,
        maxlength: 1000,
    },
    duration : {
        type : Number,
        required : true
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{
    timestamps: true,
})

videoSchema.plugin(mongooseAggregatePaginate);
export const Video =  mongoose.model('Video', videoSchema);