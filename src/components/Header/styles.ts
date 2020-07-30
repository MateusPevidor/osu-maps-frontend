import styled, { css } from 'styled-components';

interface SeachBoxProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  background-color: #0c0715;
  display: flex;
  justify-content: center;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

  > div {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }
`;

export const Logo = styled.img``;

export const Title = styled.div`
  height: 80%;
  max-width: 200px;
  display: flex;
  align-items: center;
  transition: 0.1s;

  cursor: pointer;

  p {
    color: #e9e5e9;
    font-size: 26px;
    display: flex;
    align-items: center;

    span {
      color: #fd3f55;
    }
  }

  svg {
    height: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const SearchBox = styled.div<SeachBoxProps>`
  height: 60%;
  display: flex;
  align-items: center;

  background: #e9e5e9;

  border: 1px solid #e9e5e9;
  border-radius: 12px;

  transition: 0.2s;

  ${props =>
    props.isFocused &&
    css`
      border: 1px solid #fd3f55;
    `}

  input {
    background: #e9e5e9;
    border: 0;
    height: 80%;
    width: 80%;

    &::placeholder {
      color: #c0c0c0;
    }

    color: #333;
  }

  svg {
    color: #c0c0c0;

    ${props =>
      props.isFocused &&
      css`
        color: #fd3f55;
      `}
    ${props =>
      props.isFilled &&
      css`
        color: #fd3f55;
      `}

    width: 20px;
    height: auto;
    margin: 0 10px 0 10px;
    transition: 0.2s;
  }
`;

export const Icon = styled.img``;
