import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  let component
  const title = 'New title'
  const author = 'New author'
  const url = 'www.newurl.fi'

  const onBlogCreate = jest.fn()

  beforeEach(() => {
    component = render(<BlogForm onBlogCreate={onBlogCreate} />)
  })

  test('create blog succesfully', () => {
    const form = component.container.querySelector('#new-blog-form')
    const titleInput = component.container.querySelector('#title-input')
    const authorInput = component.container.querySelector('#author-input')
    const urlInput = component.container.querySelector('#url-input')

    fireEvent.change(titleInput, { target: { value: title } })
    fireEvent.change(authorInput, { target: { value: author } })
    fireEvent.change(urlInput, { target: { value: url } })

    fireEvent.submit(form)

    expect(onBlogCreate.mock.calls).toHaveLength(1)
    expect(onBlogCreate.mock.calls[0][0]).toMatchObject({
      title,
      author,
      url,
    })
  })
})
