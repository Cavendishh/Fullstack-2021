import React from 'react';

import Part from './Part';
import { CoursePart } from '../types';

interface Props {
  parts: CoursePart[];
}

const Content = ({ parts }: Props) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;
