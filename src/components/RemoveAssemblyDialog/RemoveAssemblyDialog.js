/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form,
  Field,
  ErrorMessage,
  withFormik,
} from 'formik';
import * as Yup from 'yup';

import { testFormService } from '../../services/test-form-service';
import ModalDialog from '../ModalDialog/ModalDialog';

import * as util from '../../helpers/util';

class RemoveAssemblyDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onClick() {
    this.setState({ isOpen: true });
  }

  onCloseClick() {
    this.setState({ isOpen: false });
  }

  render() {
    const {
      isSubmitting,
      status,
    } = this.props;

    const { onClick, onCloseClick } = this;
    const { isOpen } = this.state;

    // close dialog if status says so.
    /*
    let dialogOpen = isOpen;
    if (status && status.closeDialog) {
      dialogOpen = false;
    }
    */

    return (
      <div id="RemoveAssemblyDialog">
        <button type="button" className="btn btn-outline-primary" onClick={onClick}>
          Remove Assembly
        </button>
        <ModalDialog isOpen={isOpen} onCloseClick={onCloseClick}>
          <h4>Remove Assembly</h4>
          <Form>
            <p>
              Please provide contact information that WaterOne may use if there are any questions about
              the removal of this device.
            </p>

            <div className="form-group">
              <label>Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage className="form-text text-danger" name="name" component="div" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <Field name="phone" type="text" className="form-control" />
              <ErrorMessage className="form-text text-danger" name="phone" component="div" />
            </div>

            <div className="row">
              <div className="col">
                {
                  status
                  && status.replaceAssemblyError
                  && (
                  <div className="form-text text-danger text-center">
                    <p>There was an error replacing assembly:</p>
                    <p>{`${status.replaceAssemblyError}`}</p>
                  </div>
                  )
                }
              </div>
            </div>

            <div className="row">
              <div className="col text-center mt-5">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </ModalDialog>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    phone: '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const formattedNotification = util.notificationToRemovalFormat(props.notification);
    const notificationId = props.notification.NotificationNo || '';

    const comments = `Removing Assembly:
      Name: ${values.name}
      Phone Number: ${values.phone}
    `;
    formattedNotification.TestComments = comments;

    testFormService.fetchSubmissionToken(notificationId)
      .then((result) => {
        const token = result.headers['x-csrf-token'];
        return testFormService.removeAssembly(notificationId, formattedNotification, token);
      })
      .then(() => {
        props.updateState({
          redirectToForm: false,
          redirectToHome: true,
          notification: {},
          alert: {
            type: 'info',
            message: 'Thank you for your submission',
          },
        });
      })
      .catch((err) => {
        const { error } = err.response.data;
        props.updateState({
          redirectToForm: false,
          redirectToHome: true,
          notification: {},
          alert: {
            type: 'danger',
            message: error.message.value,
          },
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
})(RemoveAssemblyDialog);


/*
const handleRemoveAssembly = () => {
  const formattedNotification = util.notificationToRemovalFormat(context.notification);
  const notificationId = context.notification.NotificationNo || '';

  testFormService.fetchSubmissionToken(notificationId)
    .then((result) => {
      const token = result.headers['x-csrf-token'];
      return testFormService.replaceAssembly(formattedNotification, token);
    })
    .then(() => {
      context.updateState({
        redirectToForm: false,
        redirectToHome: true,
        notification: {},
        alert: {
          type: 'info',
          message: 'Thank you for your submission',
        },
      });
    })
    .catch((err) => {
      const { error } = err.response.data;
      context.updateState({
        redirectToForm: false,
        redirectToHome: true,
        notification: {},
        alert: {
          type: 'danger',
          message: error.message.value,
        },
      });
    });
};
*/
