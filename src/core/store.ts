import { AppStore } from 'core/store';
import { OfferDetailsState } from 'offerDetails/reducers';
import offerDetailsReducer, {
  initState as offerDetailsInitState,
} from 'offerDetails/reducers';
import { OfferListState } from 'offerList/reducers';
import offerListReducer, {
  initState as offerListInitState,
} from 'offerList/reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export interface AppStore {
  offerDetails: OfferDetailsState;
  offerList: OfferListState;
}

export const initAppStore = () => {
  let middleware = [thunk];

  const initState: AppStore = {
    offerDetails: offerDetailsInitState,
    offerList: offerListInitState,
  };

  const reducers = combineReducers({
    offerDetails: offerDetailsReducer,
    offerList: offerListReducer,
  });

  return createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};
