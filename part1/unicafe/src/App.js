import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Statistics = ({ good, neutral, bad, amount, average }) => {
  if (amount === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='Amount' value={amount} />
          <StatisticLine text='Average' value={average / amount} />
          <StatisticLine text='Positive' value={(good / amount) * 100 + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

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
      <Statistics good={good} neutral={neutral} bad={bad} amount={amount} average={average} />
    </div>
  )
}

export default App
