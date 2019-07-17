import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';

const validationSchema = Yup.object().shape({
  notificationId: Yup.string()
    .required('Required'),
});

const FindByNotificationId = ({ onSubmit }) => (
  <Formik
    initialValues={{ notificationId: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {
      ({ errors, touched, isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label name="notificationId">Notification #</label>
            <Field
              type="text"
              name="notificationId"
              className={errors.email && touched.email ? 'form-control error' : 'form-control'}
            />
            <ErrorMessage className="form-text text-danger" name="notificationId" component="div" />
            <div className="form-text text-danger">{ errors.notificationIdError }</div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Search
            </button>
          </div>
        </Form>
      )
    }
  </Formik>
);

FindByNotificationId.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FindByNotificationId;
