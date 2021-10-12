import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const anecdoteObj = { content, votes: 0 }
  const res = await axios.post(baseUrl, anecdoteObj)
  return res.data
}

const exportsObj = {
  getAll,
  createNew,
}

export default exportsObj
