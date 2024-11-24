import styled from 'styled-components';

export const ScrollableContainer = styled.div`
  width: 100%;
  max-height: 90vh;
  min-height: 90vh;
  overflow: auto;
`;

export const Item = styled.div`
  max-height: 75px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: auto;
  grid-template-areas:
    'image title price'
    'image description price';

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Image = styled.img`
  width: 100px;
  height: 75px;
  min-width: 100px;
  min-height: 75px;
  max-width: 100px;
  max-height: 75px;
  grid-area: image;
`;

export const Title = styled.div`
  font-weight: border;
  font-size: 1.2rem;
  grid-area: title;
`;

export const Description = styled.div`
  font-size: 1em;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 2em;
  max-width: 600px;
  grid-area: description;
`;

export const Price = styled.div`
  font-weight: border;
  font-size: 2rem;
  float: right;
  justify-self: center;
  align-self: center;
  grid-area: price;
`;
