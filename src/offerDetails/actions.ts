import config from 'config';
import { Offer, OfferId } from 'core/models';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createAsyncAction } from 'typesafe-actions';

export const fetchDetailsAsync = createAsyncAction(
  'FETCH_DETAILS_REQUEST',
  'FETCH_DETAILS_SUCCESS',
  'FETCH_DETAILS_FAILURE'
)<undefined, Offer, undefined>();

export const fetchOfferDetails = (
  offerId: OfferId
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(fetchDetailsAsync.request());

    try {
      const res = await fetch(`${config.url}/offers/${offerId}`);

      if (res.ok) {
        const data = await res.json();
        dispatch(fetchDetailsAsync.success(data));
      } else {
        dispatch(fetchDetailsAsync.failure());
      }
    } catch {
      dispatch(fetchDetailsAsync.failure());
    }
  };
};
