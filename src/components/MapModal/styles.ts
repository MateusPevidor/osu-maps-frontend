import styled, { css } from 'styled-components';

interface DiffProps {
  color: string;
}

interface ContainerProps {
  isVisible: boolean;
}

interface ImageContainerProps {
  imageURL: string;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;

  ${props =>
    props.isVisible
      ? css`
          & {
            display: flex;
          }
        `
      : css`
          & {
            display: none;
          }
        `};

  ${props => css`
    > circle {
      stroke: ${props.color};
    }
    circle + circle {
      fill: ${props.color};
    }
  `}
`;

export const ModalContainer = styled.div`
  width: 50%;
  height: 70%;

  background: #211f2e;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);

  border-radius: 26px;

  overflow: hidden;
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  height: 70%;
  background-image: url(${props => props.imageURL});
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position-x: 50%;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.5);
`;

export const TopContent = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  div {
    margin: 25px 0 0 32px;

    font-size: 42px;
    font-weight: 500;

    p {
      text-shadow: 4px 4px 3px #000;
    }

    p + p {
      font-size: 25px;
      font-style: italic;
    }
  }

  svg {
    width: 44px;
    height: 44px;
    margin: 14px 14px 0 0;
    filter: drop-shadow(4px 4px 3px #000);

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      color: #fd3f55;
    }
  }
`;

export const BottomContent = styled.div`
  width: calc(100% - 72px);
  display: flex;
  justify-content: space-between;

  margin-bottom: 14px;
`;

export const DiffsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Diff = styled.div<DiffProps>`
  background-color: rgba(0, 0, 0, 0.25);
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6px;

  margin-right: 10px;
  margin-top: 10px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.35);
    transition: 0s;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.45);
  }

  svg {
    width: 30px;
    height: auto;

    ${props => css`
      > circle {
        stroke: ${props.color};
      }
      circle + circle {
        fill: ${props.color};
      }
    `}
  }
`;

export const VisitWebsiteButton = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;

  padding: 14px 8px 12px 12px;
  margin-top: 10px;

  font-size: 18px;
  font-weight: 500;

  border-radius: 6px;

  transition: 0.2s;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.35);
    transition: 0s;

    svg {
      color: #fd3f55;
    }
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.45);
  }

  p {
    user-select: none;
  }

  svg {
    margin-left: 10px;
    transition: 0.2s;
    width: 22px;
    height: 22px;
  }
`;

export const MapInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div + div {
    div {
      justify-content: flex-end;
    }
  }
`;

export const InfoItem = styled.div`
  display: flex;

  font-weight: 500;
  font-size: 30px;

  margin-top: 20px;

  svg {
    stroke: #fd3f55;
    width: 37px;
    height: auto;
    margin: 0 14px;

    rect:nth-child(2),
    rect:nth-child(3) {
      fill: #fd3f55;
      stroke: #fd3f55;
    }

    * {
      stroke: #fd3f55;
    }

    ellipse {
      fill: #fd3f55;
    }
  }
`;
