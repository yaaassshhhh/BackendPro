import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
//fs is for file system and it is used to interact with the file system. It is used to read and write files, create directories, change permissions and perform other file system operations. It is a built-in module in node.js and does not need to be installed separately.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
 try {
    if(!localFilePath){
        console.log('\n Could not find localFilePath, Local file path is required is required');
        return null;
    }
    //uploading the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "video-streaming-app",
    });
    console.log("\n File uploaded to cloudinary successfully", response.url);
 } catch (error) {
    //if we get an error, we will delete the file from the local file system of our server for security and optimization purposes
    fs.unlinkSync(localFilePath, (err) => {
      if (err) {
        console.log("\n Error deleting file from local file system", err);
      } else {
        console.log("\n File deleted from local file system successfully");
      }
    });
    console.log("\n Error uploading file to cloudinary", error);
    return null;
 }
}

export {uploadOnCloudinary} ;