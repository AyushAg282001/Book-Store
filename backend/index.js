import express from "express";
import cors from 'cors'
import axios from 'axios';
import bodyParser from "body-parser";
import mongoose, { disconnect } from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"
const app = express();

// middleware in an Express application is used to parse JSON-encoded data from incoming requests.....
app.use(express.json());

// Middleware to handle CORS(Cross origin resource sharing)
//method - 1 -> allow all origins with default of cors(*)
app.use(cors());
// method - 2 -> allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         method: ['GET', 'POST', 'DELETE', 'PUT'],
//         allowHeaders: ['Content-Type'],
//     })
// );

app.get('/', (req, res) => {
    //console.log(req);
    return res.status(200).send("Hello World!")
});

app.use('/books', booksRoute);

// MongoDB connection.....
mongoose.connect(mongoDBURL).then(
    () => {
        console.log("Connected to the database");
    }).catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});



