const express = require('express');
const asyncHandler = require('express-async-handler');
const { Product, ProductCreator, User, Comment } = require('../../db/models');


const router = express.Router();

router.get('/all', asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: [Comment, User]
  });
  res.json(products)
}))

router.get('/', asyncHandler(async (req, res) => {
  // Get Home Page
  const products = await Product.findAll({
    order: [
      ['createdAt', 'ASC']
    ],
    limit: 40,
    include: [Comment, User]
  })
  res.json(products)
}))

router.post('/', asyncHandler(async (req, res) => {
  const { productName, description, image, userId } = req.body;
  const post = await Product.create({
    productName,
    description,
    image
  });

  const productCreator = await ProductCreator.create({
    userId,
    productId: post.id
  })
  res.json(post);
}))

router.get('/comment/:id', asyncHandler(async (req, res) => {
  let id = req.params.id;
  const num = Number(id);

  const comments = await Comment.findAll({
    where: {
      productId: num,

    },
    include: [User]
  })
  res.json(comments);
}))

router.post('/comment', asyncHandler(async (req, res) => {
  const { comment, userId, productId } = req.body

  newComment = await Comment.create({
    comment,
    productId,
    userId
  })

  const indComment = await Comment.findByPk(newComment.id, {
    where: { productId: productId },
    include: [User]
  })

  res.json(indComment);
}))

router.delete('/comment', asyncHandler(async (req, res) => {
  const { comId, prodId } = req.body
  const num = Number(prodId);
  const commentNum = Number(comId);
  const deletedComment = await Comment.findByPk(commentNum);
  await deletedComment.destroy();

  const comments = await Comment.findAll({
    where: {
      productId: num,

    },
    include: [User]
  })
  res.json(comments);

}))

module.exports = router;