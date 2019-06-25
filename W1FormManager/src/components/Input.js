import React from 'react';
import { Field, getIn } from 'formik';
import classnames from 'classnames';

export const InputValve = ({
  label,
  labelclassname,
  wrapperclassname,
  inputclassname,
  name,
  left,
  right,
  bypass,
  ...props
}) => (
  <Field
    name={name}
    render={({ form, field }) => {
      const error = getIn(form.errors, name);
      const inputClassNames = classnames(
        'form-control col-4',
        error && 'is-invalid',
        inputclassname
      );
      const wrapperClassNames = classnames(
        'form-group col-md-6',
        wrapperclassname
      );
      const labelClassNames = classnames('form-label');

      const placeHolderLabel = (
        <span style={{ color: 'transparent' }}>' -'</span>
      );

      let labelEl = label ? label : placeHolderLabel;

      let leftText;
      if (bypass && left) {
        leftText = (
          <React.Fragment>
            <span className="d-inline d-sm-none">By-Pass</span> {left}
          </React.Fragment>
        );
      } else {
        leftText = left;
      }

      return (
        <div className={wrapperClassNames}>
          <label htmlFor={name} className={labelClassNames}>
            {labelEl}
          </label>
          <div className="row align-items-baseline flex-nowrap">
            <div className="col-auto">{leftText}</div>
            <input
              {...props}
              name={name}
              id={name}
              value={field.value}
              className={inputClassNames}
              onChange={form.handleChange}
              maxLength="5"
            />
            <div className="col-auto">{right}</div>
          </div>
          <ErrorMessage name={name} className="d-block" />
        </div>
      );
    }}
  />
);

export const Input = ({
  label,
  labelclassname,
  wrapperclassname,
  inputclassname,
  name,
  ...props
}) => (
  <Field
    name={name}
    render={({ form, field }) => {
      const error = getIn(form.errors, name);
      const inputClassNames = classnames(
        'form-control',
        error && 'is-invalid',
        inputclassname
      );
      const wrapperClassNames = classnames('form-group', wrapperclassname);
      const labelClassNames = classnames('form-label');
      return (
        <div className={wrapperClassNames}>
          <label htmlFor={name} className={labelClassNames}>
            {label}
          </label>
          <input
            {...props}
            name={name}
            id={name}
            value={field.value}
            className={inputClassNames}
            onChange={form.handleChange}
          />
          <ErrorMessage name={name} />
        </div>
      );
    }}
  />
);

const ErrorMessage = ({ name, className }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (
        <div className={classnames('invalid-feedback', className)}>{error}</div>
      ) : null;
    }}
  />
);

export const Select = ({
  name,
  options,
  label,
  wrapperclassname,
  labelclassname,
}) => {
  return (
    <Field name={name}>
      {({ form }) => {
        const error = getIn(form.errors, name);
        const inputClassNames = classnames(
          'form-control',
          error && 'is-invalid'
        );
        const wrapperClassNames = classnames('form-group', wrapperclassname);
        const labelClassNames = classnames(labelclassname);
        return (
          <div className={wrapperClassNames}>
            {label ? (
              <label htmlFor={name} className={labelClassNames}>
                {label}
              </label>
            ) : null}
            <select
              name={name}
              onChange={form.handleChange}
              className={inputClassNames}
            >
              <option value=""> </option>
              {options.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ErrorMessage name={name} />
          </div>
        );
      }}
    </Field>
  );
};

export function Checkbox({ name, value, error, wrapperclassname, ...props }) {
  const inputClassNames = classnames('form-check-input', error && 'invalid');
  const wrapperClassNames = classnames('form-group', wrapperclassname);
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className={wrapperClassNames}>
          <div className="form-check">
            <input
              type="checkbox"
              className={inputClassNames}
              {...props}
              checked={field.value === value}
              onChange={() => {
                if (field.value === value) {
                  form.setFieldValue(name, '');
                } else {
                  form.setFieldValue(name, value);
                }
              }}
            />
            <label className="form-check-label">{value}</label>
          </div>
          <ErrorMessage name={name} />
        </div>
      )}
    </Field>
  );
}

export const NotificationInput = ({
  notificationno,
  notificationcheckdigit,
  wrapperclassname,
}) => {
  const inputClassNames = classnames(
    'form-control',
    (notificationno.error || notificationcheckdigit.error) && 'is-invalid'
  );

  const wrapperClassNames = classnames('form-group', wrapperclassname);

  return (
    <div className={wrapperClassNames}>
      <label htmlFor={notificationno.name} className="pr-3">
        Notification #
      </label>
      <div className="input-group">
        <input
          type="text"
          {...notificationno}
          className={inputClassNames}
          maxLength="8"
          size="8"
          style={{ width: '7em' }}
        />
        <span>-</span>
        <input
          type="text"
          {...notificationcheckdigit}
          className={inputClassNames}
          maxLength="1"
          size="1"
          style={{ width: '3em' }}
        />
        {notificationno.error || notificationcheckdigit.error ? (
          <div className="invalid-feedback">
            {notificationno.error || notificationcheckdigit.error}
          </div>
        ) : null}
      </div>
    </div>
  );
};
