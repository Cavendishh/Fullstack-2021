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

const vote = async (anecdote) => {
  const { id, votes } = anecdote
  const updatedAnecdote = { ...anecdote, votes: votes + 1 }

  const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return res.data
}

const exportsObj = {
  getAll,
  createNew,
  vote,
}

export default exportsObj
