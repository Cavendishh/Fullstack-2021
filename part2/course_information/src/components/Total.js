const Total = ({ parts }) => {
  console.log(parts)
  let sum = 0

  parts.forEach((r) => (sum += r.exercises))

  return (
    <div>
      <p>
        <b>Total of exercises {sum}</b>
      </p>
    </div>
  )
}

export default Total
