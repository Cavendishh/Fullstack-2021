import express from 'express';

import { toNewPatientEntry, toNewEntry } from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPublicPatients();

  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (!patient) res.status(400).send('Patient not found');

  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err: unknown) {
    let errMsg = 'Something went wrong.';
    if (err instanceof Error) {
      errMsg += ' Error: ' + err.message;
    }
    res.status(400).send(errMsg);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);

    res.json(addedEntry);
  } catch (err: unknown) {
    let errMsg = 'Something went wrong.';
    if (err instanceof Error) {
      errMsg += ' Error: ' + err.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;
