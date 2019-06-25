import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './form-context';

import { notificationsService } from '../services/notifications-service';

class FormProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      notification: JSON.parse(localStorage.getItem('notification')) || {},
      manufacturers: {},
      alert: null,
    };

    this.findByNotificationId = this.findByNotificationId.bind(this);
    this.findByManufacturer = this.findByManufacturer.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(newState) {
    this.setState({
      ...newState,
    });
  }

  findByNotificationId(values, actions) {
    const id = values.notificationId || '';

    notificationsService.getNotification(id)
      .then((response) => {
        const { __metadata, ...notification } = response.data.d;

        this.setState({
          notification,
          redirectToForm: true,
          redirectToHome: false,
        });

        localStorage.setItem('notification', JSON.stringify(notification));
      })
      .catch((err) => {
        const { error } = err.response.data;
        actions.setFieldError('notificationIdError', error.message.value);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  }

  findByManufacturer(values, actions) {
    const { manufacturer, model, serial } = values;

    notificationsService.getByManufacturer(manufacturer, model, serial)
      .then((response) => {
        const { results } = response.data.d;

        if (results.length === 1) {
          const { __metadata, ...notification } = results[0]; // filterout __metadata.
          this.setState({
            notification,
            redirectToForm: true,
            redirectToHome: false,
          });

          localStorage.setItem('notification', JSON.stringify(notification));
        } else {
          throw Error('Notification not found');
        }
      })
      .catch((err) => {
        let errorMessage = '';

        if (err.message) { errorMessage = err.message; } else {
          const { error } = err.response.data;
          errorMessage = error.message.value;
        }

        actions.setFieldError('manufacturersError', errorMessage);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  }

  render() {
    const { children } = this.props;
    const { state } = this;

    return (
      <FormContext.Provider value={{
        // state
        notification: state.notification,
        manufacturers: state.manufacturers,
        redirectToForm: state.redirectToForm,
        redirectToHome: state.redirectToHome,
        alert: state.alert,

        // fetching
        findByNotificationId: this.findByNotificationId,
        findByManufacturer: this.findByManufacturer,

        // updateState
        updateState: this.updateState,
      }}
      >
        {children}
      </FormContext.Provider>
    );
  }
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormProvider;
