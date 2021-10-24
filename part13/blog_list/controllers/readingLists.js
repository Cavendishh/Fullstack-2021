const router = require('express').Router()

const ReadingLists = require('../models/readingLists')

router.post('/', async (req, res) => {
  const readingList = ReadingLists.create(req.body)
  res.json(readingList)
})

router.put('/:id', async (req, res) => {
  const readingList = await ReadingLists.findByPk(req.params.id)

  if (!readingList) return res.status(404).end()

  readingList.isRead = req.body.read
  await readingList.save()

  res.json(readingList)
})

module.exports = router
