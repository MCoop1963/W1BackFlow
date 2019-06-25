import React from 'react';
import classnames from 'classnames';

export const FormGroup = props => {
  const className = classnames('my-form-group', props.className);
  return (
    <div className={className}>
      {props.header ? <div className="group-header">{props.header}</div> : null}
      {props.children}
    </div>
  );
};

export const FormRow = props => {
  const className = classnames('form-row', props.className);
  return <div className={className}>{props.children}</div>;
};

export const FormSection = props => {
  const className = classnames('form-section', props.className);
  return (
    <section className={className}>
      {props.header ? (
        <div className="section-header">{props.header}</div>
      ) : null}
      {props.children}
    </section>
  );
};

export const FormSectionWithInput = props => {
  const className = classnames('form-section with-input', props.className);
  return (
    <section className={className}>
      {props.header ? (
        <div className="section-header">{props.header}</div>
      ) : null}
      {props.input}
      {props.children}
    </section>
  );
};
