import React from 'react';

interface ITotalProps {
  total: number;
}

const Total = ({ total }: ITotalProps) => {
  return <p>Number of exercises {total}</p>;
};

export default Total;
