const Countries = ({ countries }) => {
  if (countries.length > 10) return <p>More than 10 matches. Please specify. </p>

  if (!countries.length) return <p>No country found</p>

  if (countries.length === 1) {
    return (
      <div>
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
      </div>
    )
  }

  return countries.map((c) => <p key={c.name}>{c.name}</p>)
}

export default Countries
