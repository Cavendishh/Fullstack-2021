import { State } from './state';
import { Patient, PatientEntry, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT_ENTRY';
      payload: PatientEntry;
    }
  | {
      type: 'ADD_ENTRY_TO_PATIENT';
      payload: {
        data: Entry;
        patientId: string;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce((memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}),
          ...state.diagnosis,
        },
      };

    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients,
        },
      };

    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case 'ADD_PATIENT_ENTRY':
      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.payload.id]: action.payload,
        },
      };

    case 'ADD_ENTRY_TO_PATIENT':
      const patient = state.patientsDetails[action.payload.patientId];

      console.log(patient);

      patient.entries.push(action.payload.data);

      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.payload.patientId]: patient,
        },
      };

    default:
      return state;
  }
};

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload };
};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload };
};

export const addNewPatient = (payload: Patient): Action => {
  return { type: 'ADD_PATIENT', payload };
};

export const addNewPatientEntry = (payload: PatientEntry): Action => {
  return { type: 'ADD_PATIENT_ENTRY', payload };
};

export const addNewEntry = (data: Entry, patientId: string): Action => {
  return {
    type: 'ADD_ENTRY_TO_PATIENT',
    payload: {
      data,
      patientId,
    },
  };
};
