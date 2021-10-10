import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObj, config)
  return res.data
}

const exportObj = {
  setToken,
  getAll,
  create,
}

export default exportObj
