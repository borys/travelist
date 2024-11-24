import config from 'config';
import { OfferStatus } from 'core/models';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_OFFER_DETAILS,
  FETCH_OFFER_DETAILS_FAIL,
  FETCH_OFFER_DETAILS_SUCCESS,
  fetchOfferDetails,
  fetchOfferDetailsFail,
  fetchOfferDetailsSuccess,
} from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('OfferDetails actions', () => {
  const offer = {
    id: 1,
    title: 'title',
    description: 'description',
    img_url: 'image_url',
    price: 100,
    discount: 123,
    rating: 2,
    status: OfferStatus.Published,
    created_at: 'Tue Oct 15 2019 12:47:11 GMT+0200',
  };

  afterEach(() => {
    fetchMock.restore();
  });

  it('should create fetch success action', () => {
    const data = [offer];

    const expectedAction = {
      type: FETCH_OFFER_DETAILS_SUCCESS,
      data,
    };

    expect(fetchOfferDetailsSuccess(data)).toEqual(expectedAction);
  });

  it('should create fetch fail action', () => {
    const expectedAction = {
      type: FETCH_OFFER_DETAILS_FAIL,
    };

    expect(fetchOfferDetailsFail()).toEqual(expectedAction);
  });

  it('should fetch details', () => {
    fetchMock.getOnce(`${config.url}/offers/1`, {
      body: offer,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: FETCH_OFFER_DETAILS },
      { type: FETCH_OFFER_DETAILS_SUCCESS, data: offer },
    ];
    const store = mockStore({ todos: [] });

    // @ts-ignore
    return store.dispatch(fetchOfferDetails(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
