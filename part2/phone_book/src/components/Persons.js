const Persons = ({ persons, newFilter }) => {
  return (
    <ul>
      {persons
        .filter((r) => r.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((r) => (
          <li key={r.name}>
            {r.name} {r.number}
          </li>
        ))}
    </ul>
  )
}

export default Persons
