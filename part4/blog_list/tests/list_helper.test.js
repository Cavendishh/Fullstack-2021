const listHelper = require('../utils/list_helper')
const blogs = require('./dummyBlogs')

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.one)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs.all)
    expect(result).toBe(36)
  })
})

describe('Favorite blog', () => {
  test('favorite blog of list', () => {
    const result = listHelper.favoriteBlog(blogs.all)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})
