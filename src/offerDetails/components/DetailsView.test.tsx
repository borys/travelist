import {} from './styled';

import { Offer, OfferStatus } from 'core/models';
import { ShallowWrapper, shallow } from 'enzyme';
import React from 'react';

import { DetailsView } from './DetailsView';
import { Description, Image, Price, Title } from './styled';

describe('DetailsListView', () => {
  let component: ShallowWrapper;
  const offer: Offer = {
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

  beforeEach(() => {
    component = shallow(<DetailsView goBack={() => true} offer={offer} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render title', () => {
    expect(component.contains(<Title>title</Title>)).toBe(true);
  });

  it('should render description', () => {
    expect(component.contains(<Description>description</Description>)).toBe(
      true
    );
  });

  it('should render price', () => {
    expect(
      component
        .find(Price)
        .first()
        .text()
    ).toContain('100');
  });

  it('should render image', () => {
    expect(
      component
        .find(Image)
        .first()
        .prop('src')
    ).toBe('image_url');
  });
});
