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
}

export type PublicPatient = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
