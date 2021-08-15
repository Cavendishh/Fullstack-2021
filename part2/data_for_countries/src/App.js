import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((r) => setCountries(r.data))
  }, [])

  const countriesFiltered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  const onFilterChange = (e) => setFilter(e.target.value)

  return (
    <div className='App'>
      find countries <input value={filter} onChange={onFilterChange} />
      <Countries countries={countriesFiltered} />
    </div>
  )
}

export default App
