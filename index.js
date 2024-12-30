const express = require('express');
const dontenv = require('dotenv');
const morgan = require('morgan');
const connectToMongo = require('./config/db');


const app = express();

connectToMongo();

dontenv.config();

app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.send("Hello World");
    } 
);

const port = 5020;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost/${port}`);
    }
);
