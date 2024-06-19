const express = require('express');
const router = express.Router();  
const { v4: uuidv4 } = require('uuid');
const boardService = require('../service/boardService');
const { authMiddleware } = require('../middlewares/user/Login');



let posts = [];

// Create a new post
router.post('/insert', authMiddleware, async(req, res, next) => {
  console.log("🚀 ~ board.router.post ~  req.body:",  req.body)
  const user = req.session.user;    
  
  if (!user) {
    console.log("🚀 ~ router.post ~ user:", user)
    return res.status(401).json({ err: 'Unauthorized user' });
  }
  const { title, content, author, password, isPrivate } = req.body;

  const newPost = {
    userID: user.userID,
    title,
    content,
    author,
    password: isPrivate ? password : '',
    isPrivate
  };
  posts.push(newPost);
  const result = await boardService.reg(params);
  console.log("🚀 ~ router.post ~ result:", result)
  res.status(200).send({ success: true , result});
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