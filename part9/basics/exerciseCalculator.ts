export {}; // solves "cannot redeclare block scoped variable"
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average = dailyExercises.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;
  //prettier-ignore
  const rating = 
    average >= target
      ? 3
      : average >= target * 0.7
      ? 2
      : 1;
  const ratingDescription =
    average >= target
      ? 'good'
      : average >= target * 0.7
      ? 'not too bad but could be better'
      : 'you clearly lack motivation';

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    target,
    ratingDescription,
  };
};

interface ParsedExerciseArgs {
  target: number;
  dailyHours: number[];
}

const parseArgs = (args: string[]): ParsedExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  args = args.slice(3);
  const dailyHours = args.map((h) => Number(h));
  const isNanDailyArg = dailyHours.some((h) => isNaN(h));

  if (isNaN(target) || isNanDailyArg) throw new Error('Please provide all arguments as numbers');

  const hasInvalidDailyHours = dailyHours.some((hours) => hours > 24);

  if (target > 24 || hasInvalidDailyHours) {
    throw new Error('Did you know that there cant be more than 24 hours in a day only? ');
  }

  return { target, dailyHours };
};

try {
  const { target, dailyHours } = parseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (err: unknown) {
  let errorMessage = 'A wild error happened.';

  if (err instanceof Error) {
    errorMessage = `${errorMessage} Error: ${err.message}`;
  }
  console.log(errorMessage);
}
