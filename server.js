const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = BodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create(
    'How to Express your Inner Unicorn', 'This is the content. This is more content. Here is even more content!!', 'Crystal Magicson', Date.now()
    );
BlogPosts.create(
    'The Day the Internet Died', 'Bye bye to the clouds in the sky. Drove my server even further and the wifi was dry.', 'Digital McLean', Date.now()
);

app.get('/blog-posts', (req, res) => {
    res.json(ShoppingList.get());
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`your app is listening on port ${process.env.PORT || 8080}`);
});