const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const posts = require('./routes/posts');

const port = process.env.PORT || 8080;
const app = express();

mongoose.connect('mongodb+srv://')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB error: ' + err));

app.use(cors());
app.use(express.static('background'))



app.use('/posts', posts);

app.listen(port)
