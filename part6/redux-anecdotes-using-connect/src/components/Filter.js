import React from 'react'
import { connect } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const onFilter = ({ target }) => props.setFilter(target.value)

  return (
    <p>
      filter <input onChange={onFilter}></input>
    </p>
  )
}

export default connect(null, { setFilter })(Filter)
