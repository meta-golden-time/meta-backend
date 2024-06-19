const express = require('express');
const router = express.Router();
const boardService = require('../service/boardService');
const { authMiddleware } = require('../middlewares/user/Login');

let posts = [];

// Create a new post
router.post('/insert', authMiddleware, async (req, res, next) => {
  const user = req.session.user;    
  
  if (!user) {
    return res.status(401).json({ err: 'Unauthorized user' });
  }
  const { title, content, password, isPrivate } = req.body;
  const params = {
    userID: user.userID,
    name: user.name,
    title,
    content,
    password: isPrivate ? password : '',
    isPrivate,
  };
  const result = await boardService.reg(params);
  console.log("🚀 ~ result:", result)
  res.status(200).send({ success: true, result });
});

// Get all posts
router.get('/all', authMiddleware, async(req, res) => {
  const user = req.session.user;    
  
  if (!user) {
    return res.status(401).json({ err: 'Unauthorized user' });
  }
  console.log("board get/all 입장입니다.")
  const result = await boardService.allFind();
  console.log("🚀 ~ result:", {result, userID:user.userID})
  res.status(200).json({result, userID:user.userID});
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
router.put('/posts/:id',  authMiddleware, async(req, res) => {
  
  //const post = posts.find(p => p.id === id);
  // if (!post) {
  //   return res.status(404).json({ error: 'Post not found' });
  // }
  const user = req.session.user;    
  
  if (!user) {
    return res.status(401).json({ err: 'Unauthorized user' });
  }

  const { id } = req.params;
  const { title, content, password, isPrivate } = req.body;
  const params = {
    id,
    userID: user.userID,
    name: user.name,
    title,
    content,
    password: isPrivate ? password : '',
    isPrivate,
  };
  console.log("🚀 ~ router.put ~ params:", params)
  try{
    const result = await boardService.updatePost(params);
    console.log("🚀 ~ router.put ~ result:", result)

    res.status(200).json(result);
  }catch(err){
    res.status(400).json(err.message);
  }
  
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