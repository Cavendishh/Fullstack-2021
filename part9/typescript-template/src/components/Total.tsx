import React from 'react';

interface Props {
  total: number;
}

const Total = ({ total }: Props) => {
  return <p>Number of exercises {total}</p>;
};

export default Total;
