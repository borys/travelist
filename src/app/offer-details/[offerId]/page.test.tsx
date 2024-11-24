import { OfferStatus } from 'core/models';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Description, Image, Price, Title } from './_components/styled';
import { Details } from './page';

describe('Details', () => {
  const middlewares = [thunk];
  const configureMockStore = configureStore(middlewares);
  const initialState = {
    offerDetails: {
      loading: false,
      data: {
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
    },
  };
  let wrapper: any;
  const store = configureMockStore(initialState);

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Details />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should has title', () => {
    expect(wrapper.contains(<Title>title</Title>)).toBe(true);
  });

  it('should has description', () => {
    expect(wrapper.contains(<Description>description</Description>)).toBe(true);
  });

  it('should render price', () => {
    expect(
      wrapper
        .find(Price)
        .first()
        .text()
    ).toContain('100');
  });

  it('should render image', () => {
    expect(
      wrapper
        .find(Image)
        .first()
        .prop('src')
    ).toBe('image_url');
  });
});
