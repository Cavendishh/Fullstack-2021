// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum EGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: EGender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
