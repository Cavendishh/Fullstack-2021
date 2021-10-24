const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor, blogFetcher } = require('../utils/middleware')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })

  res.json(blogs)
})

router.get('/:id', blogFetcher, async (req, res) => {
  if (!req.blog) return res.status(404).end()

  return res.json(req.blog)
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })

  return res.json(blog)
})

router.put('/:id', blogFetcher, async (req, res) => {
  if (!req.blog) return res.status(404).end()

  req.blog.likes = req.body.likes
  await req.blog.save()

  res.json(req.blog)
})

router.delete('/:id', tokenExtractor, blogFetcher, async (req, res) => {
  if (req.blog?.userId !== req.user.id) return res.status(401).end()

  await req.blog.destroy()
  return res.status(204).end()
})

module.exports = router
