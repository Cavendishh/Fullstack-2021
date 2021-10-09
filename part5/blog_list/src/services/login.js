import axios from 'axios'
const baseUrl = '/api/login'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)

  return res.data
}

export default { login, setToken }
