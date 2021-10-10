import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

  let component

  beforeEach(() => {
    const dummyHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} onLike={dummyHandler} onDelete={dummyHandler} />
    )
  })

  test('normally only title and author is rendered', () => {
    const expectedText = `${blog.title} written by ${blog.author}`

    expect(component.container).toHaveTextContent(expectedText)

    expect(component.container).not.toHaveTextContent('likes')
    expect(component.container).not.toHaveTextContent('url')
  })

  test('after clicking button, url and likes are shown', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('likes')
    expect(component.container).toHaveTextContent('url')
  })
})
