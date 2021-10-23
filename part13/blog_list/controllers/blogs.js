const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog } = require('../models')
const { User } = require('../models')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (!auth?.toLowerCase()?.startsWith('bearer ')) {
    return res.status(401).json({ error: 'Bearer token missing' })
  }

  try {
    console.log('Method >> ', auth.substring(7))
    req.decodedToken = jwt.verify(auth.substring(7), SECRET)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Token invalid' })
  }

  next()
}

const blogFetcher = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const userFetcher = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log('Blogs >> ', JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.get('/:id', blogFetcher, async (req, res) => {
  if (req.blog) {
    console.log('Blog >> ', req.blog.toJSON())
    return res.json(req.blog)
  }

  res.status(404).end()
})

router.post('/', tokenExtractor, userFetcher, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })
  return res.json(blog)
})

router.put('/:id', blogFetcher, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  }
})

router.delete('/:id', blogFetcher, async (req, res) => {
  if (req.blog) await req.blog.destroy()
  return res.status(204).end()
})

module.exports = router
