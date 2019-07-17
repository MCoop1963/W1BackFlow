import * as yup from 'yup';
import transform from 'js-object-transform';
import * as moment from 'moment';

export const validationSchema = yup.object().shape({
  NotificationNo: yup
    .string()
    .required('Please enter valid Notification #.')
    .matches(/^[0-9]{8}$/, 'Please enter valid Notification #.'),
  NotificationCheckDigit: yup
    .string()
    .required('Please enter valid Notification #.')
    .matches(/^[0-9]{1}$/, 'Please enter valid Notification #.'),
  TestDate: yup.date().required('Please enter a valid date.'),
  TestType: yup.string().required('Cannot be blank.'),
  ServiceAddress: yup
    .string()
    .required('Please enter Service Address.')
    .label('Service Address')
    .max(45),
  ServiceCity: yup
    .string()
    .required('Please enter Customer City.')
    .label('City')
    .max(45),
  CustomerName: yup
    .string()
    .required('Please enter Customer Name.')
    .max(45)
    .label('Name'),
  CustomerPhone: yup
    .string()
    .label('Phone')
    .max(10),
  AssemblyType: yup.string().required('Please enter AssemblyType'),
  AssemblyLocation: yup
    .string()
    .required('Please enter Assembly Location.')
    .max(45)
    .label('Location'),
  Hazard: yup
    .string()
    .required('Please enter Hazard information.')
    .max(45)
    .label('Hazard'),
  MainManufacturer: yup
    .string()
    .required('Please enter Manufacturer.')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /AG/.test(assemblyType) ? schema.notRequired() : schema
    ),
  MainSerialNo: yup
    .string()
    .required('Please enter Serial #')
    .max(20)
    .label('Serial #')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /AG/.test(assemblyType) ? schema.notRequired() : schema
    ),
  MainSize: yup
    .string()
    .required('Please select Size')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /AG/.test(assemblyType) ? schema.notRequired() : schema
    ),
  BypassNotificationNo: yup
    .string()
    .matches(/^[0-9]{8}$/, 'Please enter valid Notification #.'),
  BypassNotificationCheckDigit: yup
    .string()
    .matches(/^[0-9]{1}$/, 'Please enter valid Notification #.'),
  BypassManufacturer: yup
    .string()
    .when(
      ['BypassNotificationNo', 'BypassNotificationCheckDigit'],
      (bypassNotificationNo, bypassNotificationCheckDigit, schema) =>
        bypassNotificationNo || bypassNotificationCheckDigit
          ? schema.required('Please enter Manufacturer.')
          : schema
    ),
  BypassSerialNo: yup
    .string()
    .max(20)
    .label('Serial #')
    .when(
      ['BypassNotificationNo', 'BypassNotificationCheckDigit'],
      (bypassNotificationNo, bypassNotificationCheckDigit, schema) =>
        bypassNotificationNo || bypassNotificationCheckDigit
          ? schema.required('Please enter Serial #')
          : schema
    ),
  BypassSize: yup
    .string()
    .when(
      ['BypassNotificationNo', 'BypassNotificationCheckDigit'],
      (bypassNotificationNo, bypassNotificationCheckDigit, schema) =>
        bypassNotificationNo || bypassNotificationCheckDigit
          ? schema.required('Please select Size')
          : schema
    ),
  MainReliefValvePsid: yup
    .string()
    .max(5)
    .label('Relief Valve')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RP|DC|RPDA|DCDA/.test(assemblyType)
          ? schema.required('Please enter Relief Valve in decimal format data.')
          : schema
    )
    .when(
      ['AssemblyType', 'MainCheckValve1Psid'],
      (assemblyType, mainCheckValve1Psid, schema) => {
        let mainCheckValve1PsidFloat = parseFloat(mainCheckValve1Psid);
        if (/RP|RPDA/.test(assemblyType) && mainCheckValve1PsidFloat) {
          return schema.test(
            'greater-than-2',
            'Invalid Relief Valve or Check Valve 1 data. Please re-enter in decimal format.',
            value => {
              let valueFloat = parseFloat(value);
              return (
                mainCheckValve1PsidFloat &&
                valueFloat &&
                valueFloat - mainCheckValve1PsidFloat >= 2.0
              );
            }
          );
        } else if (/RP|RPDA/.test(assemblyType)) {
          return schema.test(
            'greater-than-2',
            'Invalid Relief Valve data. Please re-enter in decimal format.',
            value => {
              let valueFloat = parseFloat(value);
              return valueFloat && valueFloat >= 2.0;
            }
          );
        } else {
          return schema;
        }
      }
    ),
  MainCheckValve1Psid: yup
    .string()
    .max(5)
    .label('Valve #1')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RP|DC|RPDA|DCDA/.test(assemblyType)
          ? schema.required('Please enter Check 1 data in decimal format.')
          : schema
    )
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /DC|DCDA/.test(assemblyType)
          ? schema.test(
              'greater-than-1',
              'Invalid Check 1 data. Please re-enter in decimal format.',
              value => parseFloat(value) && parseFloat(value) >= 1.0
            )
          : schema
    )
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RP|RPDA/.test(assemblyType)
          ? schema.test(
              'greater-than-5',
              'Invalid Check 1 data. Please re-enter in decimal format.',
              value => parseFloat(value) && parseFloat(value) >= 5.0
            )
          : schema
    ),
  MainCheckValve2Psid: yup
    .string()
    .max(5)
    .label('Valve #2')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RP|DC|RPDA|DCDA/.test(assemblyType)
          ? schema.required('Please enter Check 2 data in decimal format.')
          : schema
    )
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RP|DC|RPDA|DCDA/.test(assemblyType)
          ? schema.test(
              'greater-than-1',
              'Invalid Check 2 data. Please re-enter in decimal format.',
              value => parseFloat(value) && parseFloat(value) >= 1.0
            )
          : schema
    ),
  BypassReliefValvePsid: yup
    .string()
    .max(5)
    .label('Relief Valve')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RPDA/.test(assemblyType)
          ? schema.required('Please enter Relief Valve data in decimal format.')
          : schema
    )
    .when(
      ['AssemblyType', 'BypassCheckValve1Psid'],
      (assemblyType, bypassCheckValve1Psid, schema) => {
        let bypassCheckValve1PsidFloat = parseFloat(bypassCheckValve1Psid);
        if (/RPDA/.test(assemblyType) && bypassCheckValve1Psid) {
          return schema.test(
            'greater-than-2',
            'Invalid Relief Valve or Check Valve 1 data. Please re-enter in decimal format.',
            value => {
              let valueFloat = parseFloat(value);
              return (
                bypassCheckValve1PsidFloat &&
                valueFloat &&
                valueFloat - bypassCheckValve1PsidFloat >= 2.0
              );
            }
          );
        } else if (/RPDA/.test(assemblyType)) {
          return schema.test(
            'greater-than-2',
            'Invalid Relief Valve data. Please re-enter in decimal format.',
            value => {
              let valueFloat = parseFloat(value);
              return valueFloat && valueFloat >= 2.0;
            }
          );
        } else {
          return schema;
        }
      }
    ),
  BypassCheckValve1Psid: yup
    .string()
    .max(5)
    .label('Valve #1')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RPDA|DCDA/.test(assemblyType)
          ? schema.required('Please enter Check 1 data in decimal format.')
          : schema
    )
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /DCDA/.test(assemblyType)
          ? schema.test(
              'greater-than-1',
              'Invalid Check 1 data. Please re-enter in decimal format.',
              value => parseFloat(value) && parseFloat(value) >= 1.0
            )
          : schema
    )
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RPDA/.test(assemblyType)
          ? schema.test(
              'greater-than-5',
              'Invalid Check 1 data. Please re-enter in decimal format.',
              value => parseFloat(value) && parseFloat(value) >= 5.0
            )
          : schema
    ),
  BypassCheckValve2Psid: yup
    .string()
    .max(5)
    .label('Valve #2')
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RPDA|DCDA/.test(assemblyType)
          ? schema.required('Please enter Check 2 data in decimal format.')
          : schema
    )
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /RPDA|DCDA/.test(assemblyType)
          ? schema.test(
              'greater-than-1',
              'Invalid Check 2 data. Please re-enter in decimal format.',
              value => parseFloat(value) && parseFloat(value) >= 1.0
            )
          : schema
    ),
  VBAirInletPsid: yup
    .string()
    .max(5)
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /PVB|SVB/.test(assemblyType)
          ? schema
              .required('Please enter Air Inlet data.')
              .test(
                'greater-than-1',
                'Invalid Air Inlet data. Please re-enter.',
                value => {
                  let valueFloat = parseFloat(value);
                  return valueFloat && valueFloat >= 1.0;
                }
              )
          : schema
    ),
  VBChkVlvPsid: yup
    .string()
    .max(5)
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /PVB|SVB/.test(assemblyType)
          ? schema
              .required('Please enter Check Valve data.')
              .test(
                'greater-than-1',
                'Invalid Check Valve data. Please re - enter.',
                value => {
                  let valueFloat = parseFloat(value);
                  return valueFloat && valueFloat >= 1.0;
                }
              )
          : schema
    ),
  AirGapSupplySize: yup
    .string()
    .max(5)
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /AG/.test(assemblyType)
          ? schema.required('Please enter Supply data.')
          : schema
    ),
  AirGap: yup
    .string()
    .max(5)
    .when(
      'AssemblyType',
      (assemblyType, schema) =>
        /AG/.test(assemblyType)
          ? schema.required('Please enter Gap data.')
          : schema
    ),
  TestComments: yup
    .string()
    .max(256)
    .label('Comments'),
});

const formatDate = dateString => moment(dateString).format('MM/DD/YYYY');

const convertConfig = {
  NotificationNo: src => parseInt(src.NotificationNo, 10),
  NotificationCheckDigit: src => parseInt(src.NotificationCheckDigit, 10),
  TestDate: src => {
    return formatDate(src.TestDate);
  },
  BypassNotificationNo: src => parseInt(src.BypassNotificationNo, 10) || '',
  BypassNotificationCheckDigit: src =>
    parseInt(src.BypassNotificationCheckDigit, 10) || '',
  CustomerPhone: () => undefined, // remove from submission
};

export const convertFormValuesToAPI = values => {
  return transform(values, values, convertConfig);
};
