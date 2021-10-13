import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null
let config = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog) => {
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const update = async (blog) => {
  const url = `${baseUrl}/${blog.id}`

  const res = await axios.put(url, blog, config)
  return res.data
}

const remove = async (id) => {
  const url = `${baseUrl}/${id}`

  const res = await axios.delete(url, config)
  return res.data
}

const exportObj = {
  setToken,
  getAll,
  create,
  update,
  remove,
}

export default exportObj
