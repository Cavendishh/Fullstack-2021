const router = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')

const ReadingLists = require('../models/readingLists')

router.post('/', async (req, res) => {
  const readingList = ReadingLists.create(req.body)
  res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingLists.findByPk(req.params.id)

  if (readingList.userId !== req.user.id) return res.status(401).end()
  if (!readingList) return res.status(404).end()

  readingList.isRead = req.body.isRead
  await readingList.save()

  res.json(readingList)
})

module.exports = router
