import express from 'express';
// import toNewPatient from '../utils';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPublicPatients();

  console.log(patients);
  res.send(patients);
});

router.post('/', (req, res) => {
  // const newPatient = toNewPatient(req.body);

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(addedPatient);
});

export default router;
