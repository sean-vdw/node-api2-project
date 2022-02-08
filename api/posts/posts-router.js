// implement your posts router here
const Posts = require('./posts-model');
const router = require('express').Router();

// [GET] all posts '/'
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved"
      })
    })
});

// [GET] specific posts '/:id'
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "The post information could not be retrieved"})
    })
});

// [POST] '/'
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({message: "Please provide title and contents for the post"});
    } else {
      const newPost = await Posts.insert(req.body);
      res.status(201).json(newPost);
    }
  } catch(err) {
    res.status(500).json({message: "There was an error while saving the post to the database"})
  }
});

// [PUT] '/:id'
// [DELETE] '/:id'
// [GET]  '/:id/comments'  comments associated with specific post

module.exports = router;