const router = require('express').Router()
const { Op } = require('sequelize')

const Session = require('../models/session')
const { tokenExtractor } = require('../utils/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      user_id: {
        [Op.eq]: req.user.id,
      },
    },
  })

  res.status(204).end()
})

module.exports = router
