import { Offer, OfferStatus } from 'core/models';
import { ShallowWrapper, shallow } from 'enzyme';
import React from 'react';

import { OfferListView } from './OfferListView';
import { Description, Image, Item, Title, ScrollableView } from './styled';

describe('OfferListView', () => {
  let component: ShallowWrapper;
  const offers: Offer[] = [
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
  ];
  let clickCb = jest.fn();
  let loadMoreCb = jest.fn();

  beforeEach(() => {
    component = shallow(
      <OfferListView
        offers={offers}
        loadMore={loadMoreCb}
        hasMore={true}
        onItemClick={clickCb}
        initScrollPosition={0}
      />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contain items', () => {
    expect(component.find(Item).length).toBe(offers.length);
  });

  it('should contain item with title', () => {
    expect(
      component
        .find(Item)
        .first()
        .contains(<Title>title</Title>)
    ).toBe(true);
  });

  it('should contain item with description', () => {
    expect(
      component
        .find(Item)
        .first()
        .contains(<Description>description</Description>)
    ).toBe(true);
  });

  it('should contain item with image', () => {
    expect(
      component
        .find(Item)
        .first()
        .find(Image)
        .first()
        .prop('src')
    ).toBe('image_url');
  });

  it('should call onItemClick method', () => {
    component.find(Item).simulate('click');
    expect(clickCb.mock.calls.length).toBe(1);
  });
});
