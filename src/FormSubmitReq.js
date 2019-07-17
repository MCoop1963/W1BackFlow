export default {
  Form: '', //? - (web-backflow)
  FormVersion: '', //? - (1.0)

  TestType: '', //ANNUAL (Only Type currently available)
  TestDate: '', //MM/DD/YYYY (Must be in this format)
  NotificationNo: '', //######## (8 Digits)
  NotificationCheckDigit: '', //# (1 Digits)

  ServiceAddress: '', //STRING (45 Character max)
  ServiceCity: '', //STRING (45 Character max) CAN EXCLUDE FROM FORM
  CustomerName: '', //STRING (45 Character max)
  CustomerPhone: '', //STRING (10 Character max) CAN EXCLUDE FROM FORM

  AssemblyLocation: '', //STRING (45 Character max)
  Hazard: '', //STRING (45 Character max)
  AssemblyType: '', //STRING (MainLine, ByPass, PVB_SVB, AirGap ? <- TBD - Brian will send list)
  MainManufacturer: '', // STRING (Ames, Apollo-Conbraco, ARI, Backflow Direct, Cash Acme, Cla-Val, Febco, Flomatic, Hersey, Neptune, Watts, Wilkins)
  MainSerialNo: '', //STRING (20 Character max)
  MainSize: '', //STRING (0.25, 0.375, 0.50, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.0, 6.0, 8.0, 10.0, 12.0)
  MainCheckValve1Psid: '', //STRING (5 Character max)
  MainCheckValve2Psid: '', //STRING (5 Character max)
  MainReliefValvePsid: '', //STRING (5 Character max)

  BypassNotificationNo: '', //STRING (45 Character max)
  BypassNotificationCheckDigit: '', //# (1 Digits)
  BypassManufacturer: '', //STRING (Ames, Apollo-Conbraco, ARI, Backflow Direct, Cash Acme, Cla-Val, Febco, Flomatic, Hersey, Neptune, Watts, Wilkins)
  BypassSerialNo: '', //STRING (20 Character max)
  BypassSize: '', //STRING (0.25, 0.375, 0.50, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.0, 6.0, 8.0, 10.0, 12.0)
  BypassCheckValve1Psid: '', //STRING (5 Character max)
  BypassCheckValve2Psid: '', //STRING (5 Character max)
  BypassReliefValvePsid: '', //STRING (5 Character max)
  VBAirInletPsid: '', //STRING (5 Character max)
  VBChkVlvPsid: '', //STRING (5 Character max)
  AirGapSupplySize: '', //STRING (5 Character max)
  AirGap: '', //STRING (5 Character max)

  FirelineFlushDate: '', //MM/DD/YYYY (Must be in this format)
  FirelineFlushingName: '', //STRING -> check on validation

  TestComments: '', //STRING (256 Character max)

  TesterFirstName: '', //STRING (25 Character max)
  TesterLastName: '', //STRING (35 Character max)
  TesterPhone: '', //STRING (10 Character max)
  TesterCertificationNo: '', //STRING (NO LENGTH REQUIREMENT)
  TesterCertificationExpDate: '', //MM/DD/YYYY (Must be in this format)
  TesterCompanyName: '', //STRING (45 Character max)
  TesterCompanyPhone: '', //STRING (10 Character max)
  TesterCompanyFax: '', //STRING (10 Character max)
  TesterEmail: '', //STRING (NO LENGTH REQUIREMENT)
};
