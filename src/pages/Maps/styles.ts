import styled from 'styled-components';

export const CardsContainer = styled.div`
  width: 70%;
  margin: 0 auto;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  margin-top: 120px;
`;

export const Card = styled.div`
  background: #0c0715;
  width: 20%;
  height: 180px;

  position: relative;

  border-radius: 16px;
  margin: 0 2.5% 2.5% 2.5%;
  overflow: hidden;

  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.7);

  transition: 0.2s;
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 12px 12px 10px rgba(0, 0, 0, 0.7);
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  z-index: 1;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

  cursor: pointer;
`;

export const InfoContainer = styled.div`
  position: absolute;
  bottom: 0;

  background: #0c0715;

  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 2;

  user-select: none;

  div {
    display: flex;
    align-items: center;
    margin-left: 12px;

    p {
      margin-left: 6px;
      font-weight: bold;
    }

    svg {
      color: #fd3f55;
      fill: #fd3f55;
      width: 34px;
      height: auto;
    }
  }

  > svg {
    margin-right: 12px;
    width: 28px;
    height: auto;

    transition: 0.2s;

    cursor: pointer;

    &:hover {
      color: #fd3f55;
    }
  }
`;
