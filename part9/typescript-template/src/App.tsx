import React from 'react';

import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

interface ICourseParts {
  name: string;
  exerciseCount: number;
}

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: ICourseParts[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  // Calculate totalexercises done from courseparts using reducer function
  const totalExercises = courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0);

  return (
    <>
      <div>
        <h1>{courseName}</h1>
        <p>
          {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
          {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
          {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
        <p>
          Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>

      <div>
        <Header name={courseName} />
        <Content parts={courseParts} />
        <Total total={totalExercises} />
      </div>
    </>
  );
};

export default App;
