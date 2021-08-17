const Filters = ({ filter, onChange }) => {
  return (
    <p>
      filter shown with: <input value={filter} onChange={onChange} />
    </p>
  )
}

export default Filters
