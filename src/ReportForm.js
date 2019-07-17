import React from 'react';
import { withFormik } from 'formik';
import { validationSchema, convertFormValuesToAPI } from './schema';
import {
  Input,
  Checkbox,
  Select,
  NotificationInput,
  InputValve,
} from './components/Input';
import {
  FormGroup,
  FormSection,
  FormSectionWithInput,
  FormRow,
} from './components/Form';
import TestComments from './components/TestComments';
import formData from './formData';
import data from './data';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  handleReset,
  isSubmitting,
  status,
}) => {
  if (status) {
    return <div>Success</div>;
  }
  return (
    <form onSubmit={handleSubmit} className="ReportForm col-12 my-2">
      <div className="form-header">
        Backflow Prevention Assembly Test Report and Fireline Flushing Report
      </div>
      <FormSection>
        <div className="form-row align-items-center">
          <NotificationInput
            notificationno={{
              error: errors.NotificationNo,
              name: 'NotificationNo',
              value: values.NotificationNo,
              onChange: handleChange,
            }}
            notificationcheckdigit={{
              error: errors.NotificationCheckDigit,
              name: 'NotificationCheckDigit',
              value: values.NotificationCheckDigit,
              onChange: handleChange,
            }}
            wrapperclassname="col-auto form-inline"
          />
          <Input
            type="date"
            label="Test Date"
            name="TestDate"
            wrapperclassname="col-auto form-inline"
          />
          <Checkbox
            value="Annual"
            name="TestType"
            wrapperclassname="col-auto form-inline"
            error={errors.TestType}
          />
        </div>
      </FormSection>
      <FormSection header="Customer Information">
        <FormRow>
          <FormGroup className="col-auto">
            <Input type="text" label="Name" name="CustomerName" />
            <Input type="text" label="Service Address" name="ServiceAddress" />
            <Input type="text" label="City" name="ServiceCity" />
          </FormGroup>
          <FormGroup className="col-auto">
            <Input type="tel" label="Phone" name="CustomerPhone" />
          </FormGroup>
        </FormRow>
      </FormSection>
      <FormSectionWithInput
        header="Type of Assembly"
        input={
          (
            <Select
              name="AssemblyType"
              className="assembly-type"
              options={data.Assembly.Type}
            />
          )
        }
      >
        <FormRow className="flex-wrap">
          <FormGroup header="Tested Assembly Information" className="col-auto">
            <Select
              name="MainManufacturer"
              label="Manufacturer"
              options={data.Assembly.Manufacturer}
            />
            <Input type="text" label="Serial #" name="MainSerialNo" />
            <Input type="text" label="Location" name="AssemblyLocation" />
            <Select name="MainSize" label="Size" options={data.Assembly.Size} />
            <Input type="text" label="Hazard" name="Hazard" />
          </FormGroup>
          <FormGroup header="By-Pass Information" className="col-auto">
            <NotificationInput
              notificationno={{
                error: errors.BypassNotificationNo,
                name: 'BypassNotificationNo',
                value: values.BypassNotificationNo,
                onChange: handleChange,
              }}
              notificationcheckdigit={{
                error: errors.BypassNotificationCheckDigit,
                name: 'BypassNotificationCheckDigit',
                value: values.BypassNotificationCheckDigit,
                onChange: handleChange,
              }}
            />
            <Select
              name="BypassManufacturer"
              label="Manufacturer"
              options={data.Assembly.Manufacturer}
            />
            <Input type="text" label="Serial #" name="BypassSerialNo" />
            <Select
              name="BypassSize"
              label="Size"
              options={data.Assembly.Size}
            />
          </FormGroup>
        </FormRow>
      </FormSectionWithInput>
      <FormSection header="Passing Backflow Assembly Test Results">
        <FormRow className="align-items-center">
          <InputValve
            type="text"
            label="Relief Valve"
            name="MainReliefValvePsid"
            left="Opened at"
            right="PSID"
            maxLength="5"
            size="5"
          />
          <InputValve
            type="text"
            name="BypassReliefValvePsid"
            left="Opened at"
            right="PSID"
            maxLength="5"
            size="5"
            bypass
          />
        </FormRow>
        <FormRow className="align-items-center">
          <InputValve
            type="text"
            label="Valve #1"
            name="MainCheckValve1Psid"
            left="Closed tight at"
            right="PSID"
            maxLength="5"
            size="5"
          />
          <InputValve
            type="text"
            name="BypassCheckValve1Psid"
            left="Closed tight at"
            right="PSID"
            maxLength="5"
            size="5"
            bypass
          />
        </FormRow>
        <FormRow className="align-items-center">
          <InputValve
            type="text"
            label="Valve #2"
            name="MainCheckValve2Psid"
            left="Closed tight at"
            right="PSID"
            maxLength="5"
            size="5"
          />
          <InputValve
            type="text"
            name="BypassCheckValve2Psid"
            left="Closed tight at"
            right="PSID"
            maxLength="5"
            size="5"
            bypass
          />
        </FormRow>
        <FormRow className="align-items-center">
          <InputValve
            type="text"
            label="PVB/SPVB"
            name="VBAirInletPsid"
            left="Air Inlet Opened at"
            right="PSI"
            maxLength="5"
            size="5"
          />
          <InputValve
            type="text"
            name="AirGap"
            left="Check Valve Held at"
            right="PSI"
            maxLength="5"
            size="5"
          />
        </FormRow>
        <FormRow className="align-items-center">
          <InputValve
            type="text"
            label="PVB/SPVB"
            name="VBChkVlvPsid"
            left="Supply Pipe Dia."
            right="in."
            maxLength="5"
            size="5"
          />
          <InputValve
            type="text"
            name="AirGapSupplySize"
            left="Gap 2 x dia., min 1”"
            right="in."
            maxLength="5"
            size="5"
          />
        </FormRow>
        {/* <FormGroup header="Reduced Pressure / Detector Assembly">

        <h3>Double Check / Detector Assembly</h3>




      </FormGroup>
      <FormGroup header="By-Pass Test Results">

        <h3>&nbsp;</h3>




      </FormGroup> */}
      </FormSection>
      <FormSection>
        <FormGroup header="Fireline Flushing Acknowledgement">
          <Input type="date" name="FirelineFlushDate" label="Date" />
          <Input type="text" name="FirelineFlushingName" label="Name" />
        </FormGroup>
      </FormSection>
      <FormSection>
        <FormGroup>
          <TestComments buttonText="Add Comment and/or Repair Details" />
        </FormGroup>
      </FormSection>
      <FormSection header="Tester Information" flex>
        <FormRow>
          <Input
            type="text"
            name="TesterCertificationNo"
            label="Certification #"
            wrapperclassname="col"
          />
          <Input
            type="date"
            name="TesterCertificationExpDate"
            label="Expires On"
            wrapperclassname="col"
          />
        </FormRow>
        <FormRow>
          <Input
            type="text"
            name="TesterFirstName"
            label="First Name"
            wrapperclassname="col"
          />
          <Input
            type="text"
            name="TesterLastName"
            label="Last Name"
            wrapperclassname="col"
          />
        </FormRow>
        <FormRow>
          <Input
            type="text"
            name="TesterPhone"
            label="Phone"
            wrapperclassname="col"
          />
          <Input
            type="email"
            name="TesterEmail"
            label="Email"
            wrapperclassname="col"
          />
        </FormRow>
        <FormRow>
          <Input
            type="text"
            name="TesterCompanyName"
            label="Company"
            wrapperclassname="col"
          />
          <div className="col">
            <Input type="tel" name="TesterCompanyPhone" label="Company Phone" />
            <Input type="tel" name="TesterCompanyFax" label="Fax" />
          </div>
        </FormRow>
      </FormSection>
      {errors && (
        <pre>
          <code>{JSON.stringify(errors, null, 2)}</code>
        </pre>
      )}
      status:
      {status && (
        <pre>
          <code>{JSON.stringify(status, null, 2)}</code>
        </pre>
      )}
      <FormRow>
        <button
          type="button"
          disabled={isSubmitting}
          className="btn btn-primary"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          Submit
        </button>
      </FormRow>
    </form>
  );
};

// Wrap our form with the using withFormik HoC
export default withFormik({
  validateOnChange: false,
  // Transform outer props into form values
  mapPropsToValues: () => formData,
  // Add a custom validation function (this can be async too!)
  validationSchema,
  // Submission handler
  handleSubmit: (
    values,
    {
      setSubmitting,
      setStatus,
    },
  ) => {
    setSubmitting(false);
    setStatus(true);
  },
})(InnerForm);
