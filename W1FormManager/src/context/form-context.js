import React from 'react';

export default React.createContext({
  notification: {
    NotificationNo: '',
    NotificationDate: '',
    CustomerName: '',
    Telephone: '',
    City: '',
    DueDate: '',
    Street: '',
    NotificationCheckDigit: '',
    AssemblyType: '',
    AssemblyTypeDscrpt: '',
    Size: '',
    Manufacturer: '',
    SerialNo: '',
    ModelNo: '',
    FirelineFlushRequired: '',
    FirelineFlushReqDscrpt: '',
    Location: '',
    HazardCode: '',
    HazardCodeDscrpt: '',
  },
  redirectToForm: false,
  findByNotificationId: () => {},
  findByManufacturer: () => {},
  getManufacturers: () => {},
});
