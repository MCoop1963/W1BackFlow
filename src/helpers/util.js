import moment from 'moment';

export const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;
export const parseDate = date => `/Date(${moment(date).valueOf()})/`;
export const dateToHuman = (date, format) => `${moment(date, format).format('L')}`;

// TODO: Verify Tester info to be sent.
// Right now is hardcoded.
export const notificationToRemovalFormat = (notification) => {
  const formatted = {
    TestType: 'RM',
    TestDate: '/Date(1554793200000)/',
    NotificationNo: '',
    NotificationCheckDigit: '',
    Form: notification.Form,
    FormVersion: notification.FormVersion,
    ServiceAddress: notification.Street,
    ServiceCity: notification.City,
    CustomerName: notification.CustomerName,
    CustomerPhone: notification.CustomerPhone || '9133271147',
    AssemblyLocation: notification.Location,
    Hazard: notification.HazardCodeDscrpt,
    MainManufacturer: notification.Manufacturer,
    MainModelNo: notification.ModelNo,
    MainSerialNo: notification.SerialNo,
    MainSize: notification.Size,
    BypassNotificationNo: '',
    BypassNotificationCheckDigit: '',
    BypassManufacturer: '',
    BypassModelNo: '',
    BypassSerialNo: '',
    AssemblyType: notification.AssemblyType,
    MainCheckValve1Psid: '1',
    MainCheckValve2Psid: '1',
    MainReliefValvePsid: '0.0',
    BypassCheckValve1Psid: '0.0',
    BypassCheckValve2Psid: '0.0',
    BypassReliefValvePsid: '0.0',
    VBAirInletPsid: '0.0',
    VBChkVlvPsid: '0.0',
    AirGapSupplySize: '0.0',
    AirGap: '0.0',
    TestComments: '',
  };

  return formatted;
};
