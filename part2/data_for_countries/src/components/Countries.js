import Weather from './Weather'

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10) return <p>More than 10 matches. Please specify. </p>

  if (!countries.length) return <p>No country found</p>

  if (countries.length === 1) {
    return (
      <>
        <h2>{countries[0].name}</h2>
        <p>
          Capital: {countries[0].capital} <br />
          Population: {countries[0].population}
        </p>

        <h3>Languages</h3>
        <ul>
          {countries[0].languages.map((l) => {
            return <li key={l.name}>{l.name}</li>
          })}
        </ul>

        <img src={countries[0].flag} alt='country flag' widht='175' height='125' />

        <Weather capital={countries[0].capital} />
      </>
    )
  }

  return countries.map((c) => (
    <p key={c.name}>
      {c.name}
      <button onClick={onClick} country={c.name}>
        Show
      </button>
    </p>
  ))
}

export default Countries
