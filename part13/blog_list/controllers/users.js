const router = require('express').Router()
const { Op } = require('sequelize')

const { User, Blog, ReadingLists } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ include: { model: Blog } })

  res.json(users)
})

router.get('/:id', async (req, res) => {
  let isRead = {
    [Op.in]: [true, false],
  }

  if (req.query.isRead) isRead = req.query.isRead === 'true'

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog,
        as: 'reading_list',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: [],
        },
        include: {
          model: ReadingLists,
          as: 'read_status',
          attributes: { exclude: ['userId', 'blogId'] },
          where: { isRead },
        },
      },
    ],
  })

  if (user) return res.json(user)

  res.status(404).end()
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })

  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  }

  res.status(404).end()
})

module.exports = router
