import React from 'react';
import { Redirect } from 'react-router-dom';
import FormContext from '../../context/form-context';
import AppContainer from '../../components/AppContainer/AppContainer';
import SideBar from '../../components/SideBar/SideBar';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import RightContent from '../../components/RightContent/RightContent';
import RecordForm from '../../components/RecordForm/RecordForm';
import RemoveAssemblyDialog from '../../components/RemoveAssemblyDialog/RemoveAssemblyDialog';
import ReplaceAssemblyDialog from '../../components/ReplaceAssemblyDialog/ReplaceAssemblyDialog';

import './ReportForm.css';
import * as util from '../../helpers/util';

const ReportForm = () => (
  <FormContext.Consumer>
    {
      (context) => {
        if (context.redirectToHome) {
          return (<Redirect push to="/" />);
        }

        // if for whatever reason notification is not present,
        // make sure to redirect to home
        if (util.isEmpty(context.notification)) {
          context.updateState({
            redirectToHome: true,
            redirectToForm: false,
          });
        }

        const replaceAssembly = (newNotification) => {
          context.updateState({
            notification: newNotification,
          });
        };

        return (
          <div id="ReportForm">
            <AppContainer>
              <SideBar>
                <h2>Customer Information</h2>
                <div className="ml-2">
                  <div className="form-group">
                    <label>Notification #</label>
                    <p>{context.notification.NotificationNo}</p>
                  </div>
                  <div className="form-group">
                    <label>Customer Name</label>
                    <p>{context.notification.CustomerName}</p>
                  </div>
                  <div className="form-group">
                    <label>Service Address</label>
                    <p>{context.notification.Street}</p>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <p>{context.notification.City}</p>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <p>{context.notification.Telephone}</p>
                  </div>
                </div>
                <hr />
                <h2>Assembly Information</h2>
                <div className="ml-2">
                  <div className="form-group">
                    <label>TYPE OF ASSEMBLY</label>
                    <p>{`${context.notification.AssemblyType} ${context.notification.AssemblyTypeDscrpt}`}</p>
                  </div>

                  <div className="form-group">
                    <label>MANUFACTURER</label>
                    <p>{context.notification.Manufacturer}</p>
                  </div>

                  <div className="form-group">
                    <label>SERIAL #</label>
                    <p>{context.notification.SerialNo}</p>
                  </div>

                  <div className="form-group">
                    <label>LOCATION</label>
                    <p>{context.notification.Location}</p>
                  </div>

                  <div className="form-group">
                    <label>Size</label>
                    <p>{context.notification.Size}</p>
                  </div>

                  <div className="form-group">
                    <label>Hazard</label>
                    <p>{`${context.notification.HazardCode} ${context.notification.HazardCodeDscrpt}`}</p>
                  </div>
                </div>
                <hr />
                <div className="actions text-center">
                  <RemoveAssemblyDialog
                    notification={context.notification}
                    updateState={context.updateState}
                  />
                  <br />
                  <ReplaceAssemblyDialog
                    notification={context.notification}
                    replaceAssembly={replaceAssembly}
                  />
                </div>
              </SideBar>
              <RightContent>
                <BreadCrumb
                  currentLink={context.notification.NotificationNo}
                  updateState={context.updateState}
                />
                <RecordForm notification={context.notification} updateState={context.updateState} />
              </RightContent>
            </AppContainer>
          </div>
        );
      }
    }
  </FormContext.Consumer>
);

export default ReportForm;
