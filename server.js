const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create(
    'How to Express your Inner Unicorn', 'This is the content. This is more content. Here is even more content!!', 'Crystal Magicson', new Date('December 1, 2018 03:24:00')
    );
BlogPosts.create(
    'The Day the Internet Died', 'Bye bye to the clouds in the sky. Drove my server even further and the wifi was dry.', 'Digital McLean', new Date('November 1, 2018 03:24:00')
);

app.get('/blog-posts', (req, res) => {
    res.json(BlogPosts.get());
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`your app is listening on port ${process.env.PORT || 8080}`);
});