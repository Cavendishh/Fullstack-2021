import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={{ display: visible ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Togglable
