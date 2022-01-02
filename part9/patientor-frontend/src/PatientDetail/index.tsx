import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from '../state';
import { addNewPatientEntry } from '../state/reducer';
import { PatientEntry } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from '../components/EntryDetails';

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
    return (
      <div>
        <h3>
          {patient.name} ({patient.gender})
        </h3>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>

        {patient.entries.length ? (
          <>
            <h4>Patient entries:</h4>
            {patient.entries.map((e) => (
              <div className='ui raised container segment' key={e.id}>
                <EntryDetails entry={e} />

                {e.diagnosisCodes?.map((d) => {
                  const diagnose = diagnosis[d];
                  if (diagnose) {
                    return (
                      <li key={d}>
                        {diagnose.code} - {diagnose.name}
                      </li>
                    );
                  }
                })}
              </div>
            ))}
          </>
        ) : (
          <h4>No patient entries found</h4>
        )}
      </div>
    );
  }

  return <div>asdsr</div>;
};

export default PatientDetail;
