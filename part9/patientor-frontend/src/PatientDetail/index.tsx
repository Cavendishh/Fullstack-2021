import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { addNewPatientEntry, addNewEntry } from '../state/reducer';
import { PatientEntry, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetail = () => {
  const [{ diagnosis, patientsDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addNewEntry(data, id));

      setModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

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

        <Button onClick={() => openModal()}>Add new entry</Button>

        <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} onClose={closeModal} />
      </div>
    );
  }

  return null;
};

export default PatientDetail;
