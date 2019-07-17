import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import FormContext from '../../context/form-context';
import AppContainer from '../../components/AppContainer/AppContainer';
import Card from '../../components/Card/Card';
import FindByNotificationId from '../../components/FindByNotificationId/FindByNotificationId';
import FindByManufacturer from '../../components/FindByManufacturer/FindByManufacturer';

import 'react-tabs/style/react-tabs.css';
import './FindRecord.css';

const FindRecord = () => (
  <FormContext.Consumer>
    {
      (context) => {
        if (context.redirectToForm) {
          return (<Redirect push to="/report" />);
        }
        return (
          <div id="FindRecord">
            {
              context.alert
              && (
                <div className={`text-center alert alert-${context.alert.type} mb-0 p-4`} role="alert">
                  {context.alert.message}
                </div>
              )
            }
            <AppContainer>
              <h1 className="text-center">Find Record</h1>
              <Card className="find-box">
                <Tabs>
                  <TabList>
                    <Tab>Notification #</Tab>
                    <Tab>Manufacturer</Tab>
                  </TabList>
                  <TabPanel>
                    <div className="form-container">
                      <FindByNotificationId onSubmit={context.findByNotificationId} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="form-container">
                      <FindByManufacturer onSubmit={context.findByManufacturer} />
                    </div>
                  </TabPanel>
                </Tabs>
              </Card>
            </AppContainer>
          </div>
        );
      }
    }
  </FormContext.Consumer>
);

export default FindRecord;
