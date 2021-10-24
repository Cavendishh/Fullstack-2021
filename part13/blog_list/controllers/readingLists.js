const router = require('express').Router()

const ReadingLists = require('../models/readingLists')

router.post('/', async (req, res) => {
  const readingList = ReadingLists.create(req.body)
  res.json(readingList)
})

module.exports = router
