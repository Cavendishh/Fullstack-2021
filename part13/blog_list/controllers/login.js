const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ where: { username: body.username } })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  if (user.disabled) return res.status(401).json({ error: 'User has been disabled by an admin' })

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  const session = await Session.create({ user_id: user.id })

  //prettier-ignore
  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
