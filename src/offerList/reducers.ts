import config from 'config';
import { Offer } from 'core/models';
import { AnyAction, Reducer } from 'redux';

import {
  FETCH_MORE_OFFERS,
  FETCH_MORE_OFFERS_FAIL,
  FETCH_MORE_OFFERS_SUCCESS,
} from './actions';

export interface OfferListState {
  loading: boolean;
  hasMore: boolean;
  nextOffset: number;
  limit: number;
  data: Offer[];
}

export const initState: OfferListState = {
  loading: false,
  hasMore: true,
  nextOffset: 0,
  limit: config.perPage,
  data: [],
};

const offerListReducer: Reducer<OfferListState, AnyAction> = (
  state: OfferListState | undefined,
  action: AnyAction
) => {
  if (state === undefined) {
    return initState;
  }

  switch (action.type) {
    case FETCH_MORE_OFFERS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MORE_OFFERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case FETCH_MORE_OFFERS_SUCCESS:
      return {
        ...state,
        nextOffset: action.offset,
        limit: action.limit,
        hasMore: action.hasMore,
        data: [...state.data, ...action.data],
        loading: false,
      };
    default:
      return state;
  }
};

export default offerListReducer;
