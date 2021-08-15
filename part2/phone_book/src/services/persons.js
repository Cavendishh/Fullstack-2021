import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (obj) => {
  return axios.post(baseUrl, obj)
}

const update = (obj) => {
  console.log('OBJECT', obj)
  return axios.put(`${baseUrl}/${obj.id}`, obj)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const exportObj = {
  getAll,
  create,
  update,
  remove,
}

export default exportObj
