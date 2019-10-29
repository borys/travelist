import { AppStore } from 'core/store';
import { OfferListState } from 'offerList/reducers';
import offerListReducer, {
  initState as offerListInitState,
} from 'offerList/reducers';
import {
  Reducer,
  ReducersMapObject,
  Store,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export interface AppStore {
  offerList: OfferListState;
}

const staticReducers = {
  offerList: offerListReducer,
};

export interface WithAsync {
  asyncReducers: ReducersMapObject;
  injectReducer: (key: string, asyncReducer: Reducer) => void;
}

const createReducers = (staticReducers: ReducersMapObject) => (
  asyncReducer: ReducersMapObject
) => {
  return combineReducers({ ...staticReducers, ...asyncReducer });
};

const createAsyncReducers = createReducers(staticReducers);

const withAsyncReducers = (store: Store): Store & WithAsync => {
  return {
    ...store,
    asyncReducers: {},
    injectReducer(key: string, asyncReducer: Reducer) {
      this.asyncReducers[key] = asyncReducer;
      this.replaceReducer(createAsyncReducers(this.asyncReducers));
      console.log(`Injected reducer ${key}`);
    },
  };
};

export const initAppStore = () => {
  const middleware = [thunk];

  const initState: AppStore = {
    offerList: offerListInitState,
  };

  const reducers = createReducers(staticReducers)({});

  let appliedMiddlewares = applyMiddleware(...middleware);
  if (process.env.NODE_ENV !== 'production') {
    appliedMiddlewares = composeWithDevTools(appliedMiddlewares);
  }

  return withAsyncReducers(
    createStore(reducers, initState, appliedMiddlewares)
  );
};
