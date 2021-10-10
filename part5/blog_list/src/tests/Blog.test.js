import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const user = {
    username: 'Tester',
    id: '6161fc4f8486d15ea0b335bc',
  }

  const blog = {
    title: 'New title',
    author: 'New author',
    url: 'www.new.fi',
    likes: 2,
    user,
    id: 'f89dasf778r78sadf764372a',
  }

  test('All fields render correctly', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} onLike={mockHandler} onDelete={mockHandler} />
    )

    component.debug()

    const expectedText = `${blog.title} written by ${blog.author}`

    expect(component.container).toHaveTextContent(expectedText)
    expect(component.container).not.toHaveTextContent('likes')
    expect(component.container).not.toHaveTextContent('url')
  })
})
