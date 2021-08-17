import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then((r) => r.data)

const create = (obj) => axios.post(baseUrl, obj).then((r) => r.data)

const update = (obj) => axios.put(`${baseUrl}/${obj.id}`, obj).then((r) => r.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((r) => r.data)

const exportObj = {
  getAll,
  create,
  update,
  remove,
}

export default exportObj
