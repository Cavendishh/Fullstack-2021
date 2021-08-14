import Part from './Part'
import Total from './Total'

const Content = ({ course }) => {
  const { parts } = course

  return (
    <>
      {parts.map((r) => (
        <Part part={r} key={r.name} />
      ))}
      <Total parts={parts} />
    </>
  )
}

export default Content
