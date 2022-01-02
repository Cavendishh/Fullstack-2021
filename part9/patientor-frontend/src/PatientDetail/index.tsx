import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from '../state';
import { addNewPatientEntry } from '../state/reducer';
import { PatientEntry } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetail = () => {
  const [{ diagnosis, patientsDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patientsDetails[id];

  useEffect(() => {
    if (!patient) void fetchData();
  }, []);

  const fetchData = async () => {
    void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

    try {
      const { data } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${id}`);

      dispatch(addNewPatientEntry(data));
    } catch (e) {
      console.error(e);
    }
  };

  if (patient) {
    console.log('Patient >>', patient);
    console.log('diagnosis >>', diagnosis);

    return (
      <div>
        <h3>
          {patient.name} ({patient.gender})
        </h3>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>

        <h4>Patient entries:</h4>
        {patient.entries.map((e) => (
          <div key={e.id}>
            <p>
              {e.date} - {e.description}
            </p>

            <ul>
              {e.diagnosisCodes?.map((d) => {
                const diagnose = diagnosis[d];
                if (diagnose)
                  return (
                    <li key={d}>
                      {diagnose.code} - {diagnose.name}
                    </li>
                  );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return <div>asdsr</div>;
};

export default PatientDetail;
