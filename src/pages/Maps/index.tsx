import React from 'react';

import { FiExternalLink, FiStar } from 'react-icons/fi';
import Header from '../../components/Header';

import { CardsContainer, Card, CoverImage, InfoContainer } from './styles';

import Cover from '../../assets/cover.jpg';

const Maps: React.FC = () => {
  return (
    <>
      <Header />

      <CardsContainer>
        <Card>
          <CoverImage src={Cover} />
          <InfoContainer>
            <div>
              <FiStar />
              <p>1.77 - 3.68</p>
            </div>
            <FiExternalLink />
          </InfoContainer>
        </Card>
      </CardsContainer>
    </>
  );
};

export default Maps;
