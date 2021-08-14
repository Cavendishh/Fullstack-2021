const Total = ({ parts }) => {
  const sum = parts
    .map((part) => part.exercises)
    .reduce((s, currentValue) => s + currentValue)

  return (
    <div>
      <p>
        <b>Total of exercises {sum}</b>
      </p>
    </div>
  )
}

export default Total
