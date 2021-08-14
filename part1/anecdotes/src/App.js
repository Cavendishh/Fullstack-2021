import React, { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const GenerateMostVoted = ({ votes, anecdotes }) => {
  const maxVote = Math.max(...votes)
  let maxIndex = votes.indexOf(maxVote)

  if (maxVote === 0) return <p>No anecdotes has been voted yet.</p>

  return (
    <p>
      "{anecdotes[maxIndex]}" has <b>{votes[maxIndex]}</b> votes.
    </p>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  ]

  const onGenerateAnecdote = () => setSelected(Math.round(Math.random() * (anecdotes.length - 1)))

  const onAddVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <>
      <Button onClick={onGenerateAnecdote} text={'Next anecdote'} />
      <Button onClick={onAddVote} text={'Vote this'} /> <br />
      {anecdotes[selected]}
      <p>This anecdote has {votes[selected]} votes.</p>
      <h3>Anecdote with the most votes</h3>
      <GenerateMostVoted votes={votes} anecdotes={anecdotes} />
    </>
  )
}

export default App
