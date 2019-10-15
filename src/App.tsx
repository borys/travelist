import 'App.css';

import { initAppStore } from 'core/store';
import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { withSuspense } from 'utils/withSuspense';

const OfferList = lazy(() => import('./offerList'));
const OfferDetails = lazy(() => import('./offerDetails'));

const store = initAppStore();

const Layout = styled.div`
  max-width: 800px;
  margin: auto;
`;

const App: React.FC = () => {
  return (
    <Layout>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={withSuspense(OfferList)} />
            <Route
              exact
              path='/details/:offerId'
              component={withSuspense(OfferDetails)}
            />
          </Switch>
        </Router>
      </Provider>
    </Layout>
  );
};

export default App;
