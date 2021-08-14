import Part from './Part'

const Content = ({ course: { parts } }) => (
  <>
    {parts.map((r) => (
      <Part part={r} key={r.name} />
    ))}
  </>
)

export default Content
