import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
    // here, there might be an issue where user is uploading a file with the same name as the one already in the temp folder, so it will be overwritten, but since in this project we are using cloudinary, we will not be saving the file for too long, so it will be deleted after uploading to cloudinary, so we can just use the original name of the file
    // cb(null, file.fieldname + '-' + uniqueSuffix) 
  }
})

export const upload = multer({ 
    storage,
 })