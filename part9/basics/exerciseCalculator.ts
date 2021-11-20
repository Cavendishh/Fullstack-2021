interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length
  const trainingDays = dailyExercises.filter((day) => day > 0).length
  const average = dailyExercises.reduce((acc, curr) => acc + curr, 0) / periodLength
  const success = average >= target
  //prettier-ignore
  const rating = 
    average >= target
      ? 3
      : average >= target * 0.7
      ? 2
      : 1
  const ratingDescription =
    average >= target
      ? 'good'
      : average >= target * 0.7
      ? 'not too bad but could be better'
      : 'you clearly lack motivation'

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    target,
    ratingDescription,
  }
}

const exercises = [3, 0, 2, 4.5, 0, 3, 1]
const target = 2

console.log(calculateExercises(exercises, target))
