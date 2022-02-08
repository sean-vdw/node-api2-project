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
// [POST] '/'
// [PUT] '/:id'
// [DELETE] '/:id'
// [GET]  '/:id/comments'  comments associated with specific post

module.exports = router;