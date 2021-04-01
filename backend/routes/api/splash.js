const express = require('express');
const asyncHandler = require('express-async-handler');
const { Product, ProductCreator } = require('../../db/models');


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  // Get Home Page
  const products = await Product.findAll({
    order: [
      ['createdAt', 'ASC']
    ],
    limit: 40
  })

  console.log(products);

  res.json(products)
}))

router.post('/', asyncHandler(async (req, res) => {
  console.log('================', req.body);
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

module.exports = router;