import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import FormProvider from './context/form-provider';
import FindRecord from './screens/FindRecord/FindRecord';
import ReportForm from './screens/ReportForm/ReportForm';

const App = () => (
  <FormProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FindRecord} />
        <Route path="/report" component={ReportForm} />
      </Switch>
    </BrowserRouter>
  </FormProvider>
);

export default App;
