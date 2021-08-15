const Persons = ({ persons, newFilter, onDelete }) => {
  return (
    <ul>
      {persons
        .filter((r) => r.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((r) => (
          <li key={r.name}>
            {r.name} {r.number}{' '}
            <button value={r.id} onClick={onDelete}>
              Delete
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Persons
