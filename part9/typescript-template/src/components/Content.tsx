import React from 'react';

interface ICourseParts {
  name: string;
  exerciseCount: number;
}

const Content = ({ parts }: { parts: ICourseParts[] }) => {
  return (
    <>
      {parts.map((p) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
