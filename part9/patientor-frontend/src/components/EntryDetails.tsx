import React from 'react';
import { Icon } from 'semantic-ui-react';

import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
} from '../types';
import { assertNever } from '../utils';

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryItem entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryItem entry={entry} />;

    case 'HealthCheck':
      return <HealthCheckEntryItem entry={entry} />;

    default:
      return assertNever(entry);
  }
};

const HospitalEntryItem = ({ entry }: { entry: HospitalEntry }) => (
  <>
    <h3>
      {entry.date} <Icon name='hospital symbol' size='large' color='red' />
    </h3>

    <p>{entry.description}</p>

    <h5>
      Discharged on {entry.discharge.date}. Reason: {entry.discharge.criteria}
    </h5>
  </>
);

const OccupationalHealthcareEntryItem = ({ entry }: { entry: OccupationalHealthcareEntry }) => (
  <>
    <h3>
      {entry.date} <Icon name='stethoscope' size='large' /> {entry.employerName}
    </h3>

    <p>{entry.description}</p>

    {entry.sickLeave && (
      <h5>
        Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
      </h5>
    )}
  </>
);

const HealthCheckEntryItem = ({ entry }: { entry: HealthCheckEntry }) => (
  <>
    <h3>
      {entry.date} <Icon name='doctor' size='large' />
    </h3>

    <p>{entry.description}</p>

    {entry.healthCheckRating === HealthCheckRating.Healthy && <Icon name='heart' color='green' />}
    {entry.healthCheckRating === HealthCheckRating.LowRisk && <Icon name='heart' color='yellow' />}
    {entry.healthCheckRating === HealthCheckRating.HighRisk && <Icon name='heart' color='orange' />}
    {entry.healthCheckRating === HealthCheckRating.CriticalRisk && <Icon name='heart' color='red' />}
  </>
);

export default EntryDetails;
