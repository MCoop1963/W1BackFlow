import React from 'react';

export default ({ notificationno, notificationcheckdigit }) => {
  const inputClassNames = [
    'form-control',
    (notificationno.error || notificationcheckdigit.error) && 'invalid',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-group">
      <label>Notification #</label>
      <div style={{ width: '166px' }}>
        <input
          type="text"
          {...notificationno}
          className={inputClassNames}
          maxLength="8"
          size="8"
          // required
        />
        -
        <input
          type="text"
          {...notificationcheckdigit}
          className={inputClassNames}
          maxLength="1"
          size="1"
          // required
        />
      </div>
      {notificationno.error || notificationcheckdigit.error ? (
        <div className="error-message">
          <small>{notificationno.error}</small>
        </div>
      ) : null}
    </div>
  );
};
