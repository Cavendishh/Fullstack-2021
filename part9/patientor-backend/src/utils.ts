import { NewPatientEntry, EGender, EntryWithoutId, HealthCheckRating, Diagnose } from './types';
import diagnoses from '../data/diagnoses.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (obj: any): NewPatientEntry => {
  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: [],
  };
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: unknown): EGender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const isStringArray = (array: unknown[]): array is string[] => {
  return !array.some((elem) => typeof elem !== 'string');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is EGender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EGender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): EntryWithoutId => {
  switch (obj.type) {
    case 'HealthCheck':
      const entryObj1: EntryWithoutId = {
        type: 'HealthCheck',
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };
      if (obj.diagnosisCodes) entryObj1.diagnosisCodes = parseDiagnosis(obj.diagnosisCodes);

      return entryObj1;

    case 'OccupationalHealthcare':
      const entryObj2: EntryWithoutId = {
        type: 'OccupationalHealthcare',
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        employerName: parseEmployerName(obj.employerName),
      };
      if (obj.diagnosisCodes) entryObj2.diagnosisCodes = parseDiagnosis(obj.diagnosisCodes);
      if (obj.sickLeave) {
        entryObj2.sickLeave = {
          startDate: parseDate(obj.sickLeave.startDate),
          endDate: parseDate(obj.sickLeave.endDate),
        };
      }

      return entryObj2;

    case 'Hospital':
      const entryObj3: EntryWithoutId = {
        type: 'Hospital',
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        discharge: {
          date: parseDate(obj.discharge.date),
          criteria: parseDescription(obj.discharge.criteria),
        },
      };
      if (obj.diagnosisCodes) entryObj3.diagnosisCodes = parseDiagnosis(obj.diagnosisCodes);

      return entryObj3;

    default:
      return assertNever(obj);
  }
};

const parseDiagnosis = (diagnosisArr: unknown): Array<Diagnose['code']> => {
  if (!diagnosisArr || !Array.isArray(diagnosisArr) || !isStringArray(diagnosisArr)) {
    throw new Error(`Incorrect or missing diagnosis: ${diagnosisArr}`);
  }

  diagnosisArr.forEach((code: string) => {
    if (!diagnoses.find((d) => d.code === code)) {
      throw new Error(`Incorrect diagnosis code: ${code}`);
    }
  });

  return diagnosisArr;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employerName: ${employerName}`);
  }

  return employerName;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing rating: ${rating}`);
  }

  return rating;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

export const assertNever = (value: unknown): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
