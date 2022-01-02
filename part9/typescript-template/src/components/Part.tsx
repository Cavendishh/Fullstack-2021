import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );

    case 'groupProject':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );

    case 'submission':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          {part.exerciseSubmissionLink}
        </p>
      );

    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          Requirements: {part.requirements?.join(', ')}
        </p>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
