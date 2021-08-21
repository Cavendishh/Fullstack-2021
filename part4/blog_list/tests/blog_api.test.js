const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all bogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id field in blog objects', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body[0].id).toBeDefined()
})

test('adding a new blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'A new blog',
    author: 'Tester',
    url: 'https://google.com/',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

  const blogTitles = blogsAtEnd.map((b) => b.title)
  expect(blogTitles).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
