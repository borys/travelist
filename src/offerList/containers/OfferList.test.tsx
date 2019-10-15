import { OfferStatus } from 'core/models';
import { mount, render } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Description, Image, Item, Title } from '../components/styled';
import { OfferList } from './OfferList';

describe('OfferList', () => {
  const middlewares = [thunk];
  const configureMockStore = configureStore(middlewares);
  const initialState = {
    offerList: {
      loading: false,
      data: [
        {
          id: 1,
          title: 'title',
          description: 'description',
          img_url: 'image_url',
          price: 100,
          discount: 123,
          rating: 2,
          status: OfferStatus.Published,
          created_at: 'Tue Oct 15 2019 12:47:11 GMT+0200',
        },
      ],
    },
  };
  let wrapper: any;
  const store = configureMockStore(initialState);
  let history: any, location: any;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <OfferList />
          <Route
            path='*'
            render={(r) => {
              history = r.history;
              location = r.location;
              return null;
            }}
          />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should contain items', () => {
    expect(wrapper.find(Item).length).toBe(initialState.offerList.data.length);
  });

  it('should contain item with title', () => {
    expect(
      wrapper
        .find(Item)
        .first()
        .contains(<Title>title</Title>)
    ).toBe(true);
  });

  it('should contain item with description', () => {
    expect(
      wrapper
        .find(Item)
        .first()
        .contains(<Description>description</Description>)
    ).toBe(true);
  });

  it('should contain item with image', () => {
    expect(
      wrapper
        .find(Item)
        .first()
        .find(Image)
        .first()
        .prop('src')
    ).toBe('image_url');
  });

  it('should go to details page', () => {
    wrapper.find(Item).simulate('click');
    expect(location.pathname).toBe('/details/1');
  });
});
