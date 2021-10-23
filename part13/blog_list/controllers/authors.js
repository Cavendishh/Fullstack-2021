const router = require('express').Router()
const sequelize = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId', 'id', 'url', 'title', 'likes'],
      include: [
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
    },
    group: ['author'],
  })

  res.json(blogs)
})

module.exports = router
