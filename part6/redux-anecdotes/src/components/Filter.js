import React from 'react'
import { useDispatch } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const onFilter = ({ target }) => {
    dispatch(setFilter(target.value))
  }

  return (
    <p>
      filter <input onChange={onFilter}></input>
    </p>
  )
}

export default Filter
