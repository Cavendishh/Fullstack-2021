import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((r) => setCountries(r.data))
  }, [])

  const onFilterChange = (e) => setFilter(e.target.value)
  const onButtonClick = (event) => setFilter(event.target.attributes.country.value)

  const countriesFiltered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className='App'>
      find countries <input value={filter} onChange={onFilterChange} />
      {countries.length > 0 && <Countries countries={countriesFiltered} onClick={onButtonClick} />}
    </div>
  )
}

export default App
