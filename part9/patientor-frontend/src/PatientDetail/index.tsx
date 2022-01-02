import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from '../state';
import { PatientEntry } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetail = () => {
  const [{ patientsDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patientsDetails[id];

  useEffect(() => {
    if (!patient) void fetchData();
  }, []);

  const fetchData = async () => {
    void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

    try {
      const { data } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${id}`);

      dispatch({ type: 'ADD_PATIENT_ENTRY', payload: data });
    } catch (e) {
      console.error(e);
    }
  };

  if (patient) {
    return (
      <div>
        <h3>
          {patient.name} ({patient.gender})
        </h3>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </div>
    );
  }

  return <div>asdsr</div>;
};

export default PatientDetail;
