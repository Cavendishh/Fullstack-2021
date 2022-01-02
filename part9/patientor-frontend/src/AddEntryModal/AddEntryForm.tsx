import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';

import { EntryWithoutId } from '../types';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type EntryFormValues = EntryWithoutId;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field label='Type' placeholder='Type' name='type' component={TextField} />
            <Field label='Description' placeholder='Description' name='description' component={TextField} />
            <Field label='Date of visit' placeholder='Date' name='date' component={TextField} />
            <Field label='Specialist name' placeholder='Full name' name='specialist' component={TextField} />

            <Field
              label='Health check rating'
              name='healthCheckRating'
              component={NumberField}
              min={0}
              max={3}
            />

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>

              <Grid.Column floated='right' width={5}>
                <Button type='submit' floated='right' color='green' disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
