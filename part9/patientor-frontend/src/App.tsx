import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue } from './state';
import { setPatientList, setDiagnosisList } from './state/reducer';
import { Patient, Diagnosis } from './types';

import PatientListPage from './PatientListPage';
import PatientDetail from './PatientDetail';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    void fetchPatientList();
    void fetchDiagnosisList();
  }, [dispatch]);

  const fetchPatientList = async () => {
    try {
      const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
      dispatch(setPatientList(data));
    } catch (e) {
      console.error('Couldnt fetch patient data. Error: ', e);
    }
  };

  const fetchDiagnosisList = async () => {
    try {
      const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      dispatch(setDiagnosisList(data));
    } catch (e) {
      console.error('Couldnt fetch patient data. Error: ', e);
    }
  };

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path='/:id'>
              <PatientDetail />
            </Route>

            <Route path='/'>
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
