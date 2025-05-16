import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
    //credentials : true CORS configuration allows cookies, authorization headers, or TLS client certificates to be sent cross-domain.
}));
// Parse form data
app.use(express.json({
    limit : "16kb"
}));
//to parse URL data
app.use(express.urlencoded({
    limit : "16kb",
    extended : true
}));
// to store incoming files(images, favicon etc) in a static way in public folder
app.use(express.static("public"));
export {app}