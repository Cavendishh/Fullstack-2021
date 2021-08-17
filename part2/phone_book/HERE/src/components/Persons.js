const Persons = ({ persons, newFilter, onDelete }) => {
  return (
    <ul>
      {persons
        .filter((r) => r.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((p) => (
          <li key={p.name}>
            {p.name} {p.number} <button onClick={() => onDelete(p.id)}>Delete</button>
          </li>
        ))}
    </ul>
  )
}

export default Persons
