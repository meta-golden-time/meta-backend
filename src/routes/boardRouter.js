const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

let posts = [];

// Create a new post
router.post('/insert', (req, res) => {
  const { title, content, author, password, isPrivate } = req.body;
  const newPost = {
    userID: req.user.id,
    title,
    content,
    author,
    password: isPrivate ? password : '',
    isPrivate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Get all posts
router.get('/all', (req, res) => {
  res.status(200).json(posts);
});

// Get a specific post by ID
router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.status(200).json(post);
});

// Update a post
router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author, password, isPrivate } = req.body;
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  post.title = title;
  post.content = content;
  post.author = author;
  post.password = isPrivate ? password : '';
  post.isPrivate = isPrivate;
  post.updatedAt = new Date().toISOString();
  res.status(200).json(post);
});

// Delete a post
router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const post = posts[postIndex];
  if (post.isPrivate && post.password !== password) {
    return res.status(403).json({ error: 'Incorrect password' });
  }
  posts.splice(postIndex, 1);
  res.status(200).json({ message: 'Post deleted successfully' });
});

module.exports = router;