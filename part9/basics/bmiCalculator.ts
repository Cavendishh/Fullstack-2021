export const calculateBmi = (height: number, weight: number): string => {
  height = height / 100; // Converts to meters
  const bmi = weight / (height * height);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

interface BmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const handleError = (err: unknown) => {
  let errorMessage = 'A wild error happened.';

  if (err instanceof Error) {
    errorMessage = `${errorMessage} Error: ${err.message}`;
  }
  console.log(errorMessage);
};

const getBmi = () => {
  try {
    const { height, weight } = parseArgs(process.argv);
    calculateBmi(height, weight);
  } catch (err: unknown) {
    handleError(err);
  }
};

if (process?.argv?.length > 2) console.log('Bmi: ', getBmi());
