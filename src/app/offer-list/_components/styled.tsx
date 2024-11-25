import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
`;

export const ScrollableView = styled.div`
  width: 100%;
  overflow: hidden;
  max-height: 70vh;
  min-height: 70vh;
  overflow: auto;
`;

export const Item = styled.div`
  background-color: azure;
  padding: 10px;
  max-height: 85px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  display: grid;
  grid-template-columns: 110px auto 100px;
  grid-template-rows: auto;
  grid-template-areas:
    'photo title price'
    'photo description price';

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export const PhotoPlaceholder = styled.div`
  padding: 5px;
  width: 100px;
  height: 75px;
  grid-area: photo;
`;

export const Title = styled.div`
  font-weight: border;
  font-size: 1.2rem;
  grid-area: title;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
