import config from 'config';
import { OfferStatus } from 'core/models';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_MORE_OFFERS,
  FETCH_MORE_OFFERS_FAIL,
  FETCH_MORE_OFFERS_SUCCESS,
  fetchMoreOffers,
  fetchMoreOffersFail,
  fetchMoreOffersSuccess,
} from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('OfferList actions', () => {
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
    const offset = 1;
    const limit = 20;
    const hasMore = true;

    const expectedAction = {
      type: FETCH_MORE_OFFERS_SUCCESS,
      data,
      offset,
      limit,
      hasMore,
    };

    expect(fetchMoreOffersSuccess(data, offset, limit, hasMore)).toEqual(
      expectedAction
    );
  });

  it('should create fetch fail action', () => {
    const expectedAction = {
      type: FETCH_MORE_OFFERS_FAIL,
    };

    expect(fetchMoreOffersFail()).toEqual(expectedAction);
  });

  it('should fetch more', () => {
    const offset = 10;
    const limit = 20;

    fetchMock.getOnce(
      `${config.url}/offers?status=published&offset=${offset}&limit=${limit}`,
      {
        body: [offer],
        headers: {
          'content-type': 'application/json',
          'X-Limit': '20',
          'X-Offset': '10',
          'X-Total-Count': '30',
        },
      }
    );

    const expectedActions = [
      { type: FETCH_MORE_OFFERS },
      {
        type: FETCH_MORE_OFFERS_SUCCESS,
        data: [offer],
        offset: offset + limit,
        limit,
        hasMore: false,
      },
    ];
    const store = mockStore({
      offerList: {
        loading: false,
        offset,
        limit,
      },
    });

    // @ts-ignore
    return store.dispatch(fetchMoreOffers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
