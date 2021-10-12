import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = ({ target: { value } }) => setValue(value)

  const reset = () => setValue('')

  return {
    name,
    value,
    onChange,
    reset,
  }
}
