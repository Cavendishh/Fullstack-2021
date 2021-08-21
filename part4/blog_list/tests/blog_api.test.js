const mongoose = require('mongoose')
const helper = require('./test_helper')
const { initialBlogs, blogsInDb } = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length)
  })

  test('blogs have id field in blog objects', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
  })
})

describe('POST blogs', () => {
  test('add a new blog', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'A new blog',
      author: 'Cavendishh',
      url: 'https://fullstackopen.com/',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const blogTitles = blogsAtEnd.map((b) => b.title)
    expect(blogTitles).toContain(newBlog.title)
  })

  test('if no likes defined default to 0', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Cavendishh',
      url: 'https://fullstackopen.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    const savedBlog = await blogsAtEnd.find(
      (b) => b.title === newBlog.title && b.author === newBlog.author
    )

    expect(savedBlog.likes).toBe(0)
  })

  test('if title and url are missing throw status code 400', async () => {
    const newBlog = {
      author: 'Cavendishh',
      likes: 0,
    }

    // prettier-ignore
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('DELETE blogs', () => {
  test('deletes with status code of 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    // prettier-ignore
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const blogTitles = blogsAtEnd.map((b) => b.title)

    expect(blogTitles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
