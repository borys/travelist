import { Offer } from 'core/models';
import { AnyAction, Reducer } from 'redux';

import {
  FETCH_OFFER_DETAILS,
  FETCH_OFFER_DETAILS_FAIL,
  FETCH_OFFER_DETAILS_SUCCESS,
} from './actions';

export interface OfferDetailsState {
  loading: boolean;
  data: Offer | null;
}

export const initState: OfferDetailsState = {
  loading: false,
  data: null,
};

const offerDetailsReducer: Reducer<OfferDetailsState, AnyAction> = (
  state: OfferDetailsState | undefined,
  action: AnyAction
) => {
  if (state === undefined) {
    return initState;
  }

  switch (action.type) {
    case FETCH_OFFER_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OFFER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case FETCH_OFFER_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default offerDetailsReducer;
