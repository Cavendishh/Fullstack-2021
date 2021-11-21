import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'Height and/or weight parameters missing' });
  }

  const heightValue = Number(height);
  const weightValue = Number(weight);

  if (isNaN(heightValue) || isNaN(weightValue)) {
    res.status(400).json({ error: 'Malformatted parameters' });
  }

  const bmi = calculateBmi(heightValue, weightValue);

  return res.json({
    weight,
    height,
    bmi,
  });
});

interface exercisesParams {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as exercisesParams;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'Parameters missing' });
  }

  const targetValue = Number(target);

  if (Array.isArray(daily_exercises) === false || isNaN(targetValue)) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, targetValue);

  return res.json(result);
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
