const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.username.length < 3 || body.password.length < 3) {
    return res.status(400).json({
      error: `User validation failed: Username and password minimum allowed length is three (3)`,
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter
