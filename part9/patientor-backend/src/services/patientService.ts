import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { PublicPatient, NewPatientEntry, PatientEntry } from '../types';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }): PublicPatient => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatients,
  addPatient,
};
