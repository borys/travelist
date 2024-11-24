import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Description = styled.span`
  font-size: 1rem;
`;

export const Image = styled.img`
  float: right;
  margin: 5px;
`;

export const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Summary = styled.div`
  margin-top: 10px;
  border-top: 1px solid black;
  clear: both;
  width: 100%;
`;

export const Price = styled.div`
  font-size: 4rem;
`;
