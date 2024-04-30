require("dotenv").config();
const express = require("express");
const cron = require('node-cron');

const { Post } = require("./db/connection.js");
const {scrapeLatestPost}  = require('./utils/twitter.js')

const app = express();
const port = 4000 //process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const offset = (pageNumber - 1) * pageSize;

  try {
    // Fetch all posts from your data source
    const posts = await Post.findAll({
      offset,
      limit: pageSize
    });


    // Send the posts as a JSON response
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});




// app.get("/posts/", async (req, res) => {
//   const post = await scrapeLatestPost()
//   const newPost = await Post.create({
//     id:post.id,
//     text: post.text
   
//   });

//   res.json(newPost)
// });




// Schedule the cron job to run every 2 minutes
cron.schedule('*/2 * * * *', async () => {
  try {
    // Add your existing code here
    const post = await scrapeLatestPost();
    const newPost = await Post.create({
      id: post.id,
      text: post.text
    });
    // Log the newly created post as a confirmation
    console.log('New post created:', newPost);
  } catch (error) {
    console.error('Error creating new post:', error);
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
