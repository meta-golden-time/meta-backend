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
    password,
    isPrivate,
  };
  console.log("🚀 ~ router.post ~ params:", params)
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
  const result = await boardService.allFind(); 
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
    password,
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
router.delete('/posts/:id', authMiddleware, async(req, res) => {
  const user = req.session.user;    
  
  if (!user) {
    return res.status(401).json({ err: 'Unauthorized user' });
  }  
  const { id } = req.params;
  const { password } = req.body;
  const params = {
    id,
    userID: user.userID,
    name: user.name,   
    password,   
  };

  try{
    const result = await boardService.deletePost(params);
    console.log("🚀 ~ router.put ~ result:", result)
    res.status(200).json(result);
  }catch(err){
    res.status(400).json(err.message);
  }  
});

module.exports = router;