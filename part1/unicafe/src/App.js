import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [amount, setAmount] = useState(0)

  const onPosFeedback = () => {
    setGood(good + 1)
    setAverage(average + 1)
    setAmount(amount + 1)
  }

  const onNeuFeedback = () => {
    setNeutral(neutral + 1)
    setAmount(amount + 1)
  }

  const onBadFeedback = () => {
    setBad(bad + 1)
    setAverage(average - 1)
    setAmount(amount + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={onPosFeedback} text={'good'} />
      <Button onClick={onNeuFeedback} text={'neutral'} />
      <Button onClick={onBadFeedback} text={'bad'} />
      <h2>Statistics</h2>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>all {bad}</li>
        <li>average {average / amount}</li>
        <li>positive {(good / amount) * 100} %</li>
      </ul>
    </div>
  )
}

export default App
