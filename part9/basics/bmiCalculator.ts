const calculateBmi = (height: number, weight: number): string => {
  height = height / 100 // Converts to meters
  const bmi = weight / (height * height)
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

console.log(calculateBmi(180, 74))
