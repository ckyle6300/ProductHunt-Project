const express = require('express');
const asyncHandler = require('express-async-handler');
const { Product, ProductCreator, User, Comment } = require('../../db/models');


const router = express.Router();

router.get('/all', asyncHandler(async (req, res) => {
  const profiles = await User.findAll();

  res.json(profiles);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id
  const num = Number(id);

  const userPosts = await User.findByPk(num, {
    include: [{
      model: Comment,
      include: {
        model: Product
      },
      // model: Product
    },
    {
      model: Product
    }
    ]
  })

  res.json(userPosts)
}))






module.exports = router;