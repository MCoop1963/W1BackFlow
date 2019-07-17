/* eslint-disable react/prop-types */
import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { Textarea } from 'react-formik-ui';
import Recaptcha from 'react-google-invisible-recaptcha';
import * as Yup from 'yup';
import moment from 'moment';
import { parseDate, dateToHuman } from '../../helpers/util';

import { testersService } from '../../services/testers-service';
import { testFormService } from '../../services/test-form-service';

import SearchInput from '../SearchInput/SearchInput';
import W1DatePicker from '../W1DatePicker/W1DatePicker';
import AssemblyTypeFields from '../AssemblyTypeFields/AssemblyTypeFields';
import './RecordForm.css';

class RecordForm extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit = () => {
    this.recaptcha.reset();
    this.recaptcha.execute();
  };

  handleReset = () => {
    this.props.updateState({
        TestDate: '',
        TesterFirstName: '',
        TesterLastName: '',
        TesterPhone: '',
        TesterCompanyName: '',
        TesterCompanyPhone: '',
        TesterCompanyFax: '',
        TestComments: '',
        TesterEmail: '',
        FirelineFlushingName: '',
        FirelineFlushDate: ''
      });
   }

  render() {  
    const {
      values,
      isSubmitting,
      setFieldValue,
      setFieldError,
      handleBlur,
      status,
      submitForm,
    } = this.props;

    const { onSubmit } = this;
    const onCaptchaResolved = () => {
      submitForm();
    };

    const findTesterByCertificationId = (event) => {
      handleBlur(event);
      const id = event.target.value || '';

      if (id) {
        testersService.findTesterByCertificationId(id)
          .then((response) => {
            const { results } = response.data.d;
            if (results.length === 1) {
              const { __metadata, ...tester } = results[0]; // filterout __metadata.

              setFieldValue('TesterCertificationNo', tester.CertificateNo);
              setFieldValue('TesterCertificationExpDate', tester.CertificateExpDate);
              setFieldValue('TesterFirstName', tester.Name.split(',')[1]);
              setFieldValue('TesterLastName', tester.Name.split(',')[0]);
              setFieldValue('TesterPhone', tester.TelephoneNo1);
              setFieldValue('TesterCompanyName', tester.Company);
              setFieldValue('TesterCompanyPhone', tester.TelephoneNo2);
              setFieldValue('TesterCompanyFax', tester.Fax);
              setFieldValue('TesterEmail', tester.Email);
            } else {
              throw Error('Tester NotificationNo not found');
            }
          })
          .catch((err) => {
            let errorMessage = '';
            if (err.message) { errorMessage = err.message; } else {
              const { error } = err.response.data;
              errorMessage = error.message.value;
            }

            setFieldError('TesterCertificationNo', errorMessage);

            setFieldValue('TesterCertificationNo', '');
            setFieldValue('TesterCertificationExpDate', '');
            setFieldValue('TesterFirstName', '');
            setFieldValue('TesterLastName', '');
            setFieldValue('TesterPhone', '');
            setFieldValue('TesterCompanyName', '');
            setFieldValue('TesterCompanyPhone', '');
            setFieldValue('TesterCompanyFax', '');
            setFieldValue('TesterEmail', '');
          });
      }
    };

    return (
      <div id="RecordForm">
        <Recaptcha
          ref={(ref) => { this.recaptcha = ref; }}
          //sitekey="6LfWW54UAAAAADx3u1x4xWBmKWxoWpbDKwkKt8ZN"
          sitekey="6LfGw6cUAAAAADb_PeMwqR6wX_j9QcKHdo0MNdQk"
           onResolved={onCaptchaResolved}
        />
        <form>
          <Field type="hidden" name="TestType" />
          <Field type="hidden" name="TestDate" />
          <Field type="hidden" name="NotificationNo" />
          <Field type="hidden" name="NotificationCheckDigit" />
          <Field type="hidden" name="Form" />
          <Field type="hidden" name="FormVersion" />

          <Field type="hidden" name="ServiceAddress" />
          <Field type="hidden" name="ServiceCity" />
          <Field type="hidden" name="CustomerName" />
          <Field type="hidden" name="CustomerPhone" />
          <Field type="hidden" name="AssemblyLocation" />
          <Field type="hidden" name="Hazard" />

          <Field type="hidden" name="MainManufacturer" />
          <Field type="hidden" name="MainModelNo" />
          <Field type="hidden" name="MainSerialNo" />
          <Field type="hidden" name="MainSize" />

          <Field type="hidden" name="TesterFirstName" />
          <Field type="hidden" name="TesterLastName" />
          <Field type="hidden" name="TesterPhone" />
          <Field type="hidden" name="TesterCompanyName" />
          <Field type="hidden" name="TesterCompanyPhone" />
          <Field type="hidden" name="TesterCompanyFax" />
          <Field type="hidden" name="TesterEmail" />

          <div className="row">
            <div className="col">
              <h2>Certified Tester Information</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Certification #</label>
                <SearchInput name="TesterCertificationNo" onBlur={findTesterByCertificationId} />
                <div className="form-text text-danger" name="TesterCertificationNo" component="div" />
                <ErrorMessage className="form-text text-danger" name="TesterCertificationNo" component="div" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                Tester Name:
                <strong>
                  { values.TesterFirstName || values.TesterLastName ? ` ${values.TesterFirstName} ${values.TesterLastName}` : ' N/A'}
                </strong>
                <br />

                Company Name:
                <strong>
                  { values.TesterCompanyName ? ` ${values.TesterCompanyName}` : ' N/A'}
                </strong>
                <br />

                Company Phone:
                <strong>
                  { values.TesterCompanyPhone ? ` ${values.TesterCompanyPhone}` : '--'}
                </strong>
                <br />

                Certificate Expiration Date:
                <strong>
                  { values.TesterCertificationExpDate !== '' ? ` ${dateToHuman(values.TesterCertificationExpDate, 'YYYY/MM/DD')}` : ' --' }
                </strong>
              </p>
              <p>
                <i>
                  Please contact our office if any of your contact information has recently changed.
                </i>
              </p>
            </div>
          </div>

          <hr />
          <AssemblyTypeFields assemblyType={values.AssemblyType} assemblyTypeDscrpt={ this.props.notification.AssemblyTypeDscrpt }  />
          <hr />
          {

            values.FirelineFlushRequired === 'Y'
            && (
              <React.Fragment>
                <div className="row">
                  <div className="col">
                    <h2>Fireline Flushing Acknowledgement</h2>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Name</label>
                      <Field name="FirelineFlushingName" className="form-control" />
                      <ErrorMessage className="form-text text-danger" name="FirelineFlushingName" component="div" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Fireline Flush Date</label>
                      <W1DatePicker name="FirelineFlushDate" />
                      <ErrorMessage className="form-text text-danger" name="FirelineFlushDate" component="div" />
                    </div>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            )
          }

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Comment</label>
                <Textarea name="TestComments" />
                <ErrorMessage className="form-text text-danger" name="TestComments" component="div" />
              </div>
            </div>
          </div>

          <div className="row actions">
            <div className="col-12 text-center mb-5">
              {
                status
                && status.formSubmissionError
                && (
                <div className="form-text text-danger">
                  <p>There was an error submitting the form:</p>
                  <p>{`${status.formSubmissionError}`}</p>
                </div>
                )
              }
            </div>

            <div className="col text-center">
              <button type="button" className="btn btn-outline-primary" onClick={this.handleReset}>
                Reset Form
              </button>
            </div>
            <div className="col text-center">
              <button type="button" className="submit btn btn-primary" onClick={onSubmit} disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withFormik({
  
  mapPropsToValues: props => (
    {
      TestType: props.notification.TestType || 'AN',
      TestDate: moment(),
      NotificationNo: props.notification.NotificationNo,
      NotificationCheckDigit: props.notification.NotificationCheckDigit,
      Form: 'DWQ-BPAT',
      FormVersion: '0001',
      ServiceAddress: props.notification.Street,
      ServiceCity: props.notification.City,
      CustomerName: props.notification.CustomerName,
      CustomerPhone: props.notification.Telephone,
      AssemblyLocation: props.notification.Location,
      Hazard: props.notification.HazardCodeDscrpt,
      MainManufacturer: props.notification.Manufacturer,
      MainModelNo: props.notification.ModelNo,
      MainSerialNo: props.notification.SerialNo,
      MainSize: props.notification.Size,
      BypassNotificationNo: '',
      BypassNotificationCheckDigit: '',
      BypassManufacturer: '',
      BypassModelNo: '',
      BypassSerialNo: '',
      BypassSize: '0.000',
      AssemblyType: props.notification.AssemblyType,
      FirelineFlushRequired: props.notification.FirelineFlushRequired,
      MainCheckValve1Psid: '0.0',
      MainCheckValve2Psid: '0.0',
      MainReliefValvePsid: '0.0',
      BypassCheckValve1Psid: '0.0',
      BypassCheckValve2Psid: '0.0',
      BypassReliefValvePsid: '0.0',
      VBAirInletPsid: '0.0',
      VBChkVlvPsid: '0.0',
      AirGapSupplySize: '0.0',
      AirGap: '0.0',
      FirelineFlushDate: '',
      FirelineFlushingName: '',
      TestComments: '',
      TesterFirstName: '',
      TesterLastName: '',
      TesterPhone: '',
      TesterCertificationNo: '',
      TesterCertificationExpDate: '',
      TesterCompanyName: '',
      TesterCompanyPhone: '',
      TesterCompanyFax: '',
      TesterEmail: 'german.rodriguez@metova.com',
    }
  ),


  validationSchema: Yup.object().shape({
    TesterCertificationNo: Yup.string().required('Required'),
    TesterCertificationExpDate: Yup.date().required('Required'),
    FirelineFlushingName: Yup.string()
      .when('FirelineFlushRequired', {
        is: 'Y',
        then: Yup.string().required('Required'),
      }),
    FirelineFlushDate: Yup.date()
      .when('FirelineFlushRequired', {
        is: 'Y',
        then: Yup.date().required('Required'),
      }),
  }),


  handleSubmit: (values, { setStatus, setSubmitting, props }) => {
    // const data = { FirelineFlushRequired, ...values };
    const { FirelineFlushRequired, ...data } = values;
    const notificationId = data.NotificationNo || '';

    // proper date formatting
    if(data.FirelineFlushDate === 'Y'){
      data.FirelineFlushDate = parseDate(data.FirelineFlushDate);
    } else{
      data.FirelineFlushDate = parseDate(data.TestDate);
      data.FirelineFlushingName = 'N/A';
    }
    data.TesterCertificationExpDate = parseDate(data.TesterCertificationExpDate);
    data.TestDate = parseDate(data.TestDate);
    
    // remove notification number and checkdigit
    // if submission is RP (Replace) or RM (Remove)
    if (data.TestType === 'RP' || data.TestType === 'RM') {
      data.NotificationNo = ''; data.NotificationCheckDigit = '';
    }

    testFormService.fetchSubmissionToken(notificationId)
      .then((result) => {
        const token = result.headers['x-csrf-token'];
        console.log('data', data);
        return testFormService.submitForm(data, token);
      })
      .then(() => {
        // this means previous promise was successful.
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

        // handle multiple errors thrown
        const errorMessage = error.innererror.errordetails
          .filter(e => e.code === '')
          .map(e => e.message)
          .join('\r\n');
        setStatus({ formSubmissionError: errorMessage });
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  // allows the form to be initialized again if props change.
  enableReinitialize: true,
})(RecordForm);
