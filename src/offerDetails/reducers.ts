import { Offer } from 'core/models';
import { AnyAction, Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { fetchDetailsAsync } from './actions';

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
    case getType(fetchDetailsAsync.request):
      return {
        ...state,
        loading: true,
      };
    case getType(fetchDetailsAsync.failure):
      return {
        ...state,
        loading: false,
      };
    case getType(fetchDetailsAsync.success):
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default offerDetailsReducer;
