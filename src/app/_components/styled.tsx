import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
`;

export const ScrollableList = styled.ul`
  display: block;
  width: 100%;
  overflow: hidden;
  max-height: 70vh;
  min-height: 70vh;
  overflow: auto;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  display: grid;
  background-color: azure;
  padding: 10px;
  max-height: 85px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  grid-template-columns: 110px auto 100px;
  grid-template-rows: auto;
  grid-template-areas:
    "photo title price"
    "photo description price";

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export const Avatar = styled(Image)`
  grid-area: photo;
  padding: 5px;
  width: 100px;
  height: 75px;
`;

export const Title = styled.h3`
  grid-area: title;
  font-weight: border;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

export const Description = styled.p`
  grid-area: description;
  font-size: 1em;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 2em;
  max-width: 600px;
  margin: 0;
`;

export const Price = styled.div`
  grid-area: price;
  font-weight: border;
  font-size: 2rem;
  float: right;
  justify-self: center;
  align-self: center;
`;
