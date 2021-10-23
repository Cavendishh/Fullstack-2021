const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor, blogFetcher, userFetcher } = require('../utils/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  // console.log('Blogs >> ', JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.get('/:id', blogFetcher, async (req, res) => {
  if (!req.blog) return res.status(404).end()

  // console.log('Blog >> ', req.blog.toJSON())
  return res.json(req.blog)
})

router.post('/', tokenExtractor, userFetcher, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })
  return res.json(blog)
})

router.put('/:id', blogFetcher, async (req, res) => {
  if (!req.blog) return res.status(404).end()

  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', tokenExtractor, blogFetcher, userFetcher, async (req, res) => {
  console.log(req.blog.userId)
  console.log(req.user.id)
  if (req.blog?.userId !== req.user.id) return res.status(401).end()

  await req.blog.destroy()
  return res.status(204).end()
})

module.exports = router
