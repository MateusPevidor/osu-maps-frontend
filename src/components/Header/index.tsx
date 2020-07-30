import React, { useState, useCallback, useRef } from 'react';

import { FiSearch } from 'react-icons/fi';

import { Container, Title, SearchBox } from './styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header: React.FC = () => {
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  const [isSearchBoxFilled, setIsSearchBoxFilled] = useState(false);

  const handleSearchBoxFocus = useCallback(() => {
    setIsSearchBoxFocused(true);
  }, []);

  const handleSearchBoxBlur = useCallback(() => {
    setIsSearchBoxFocused(false);

    setIsSearchBoxFilled(!!searchBoxRef.current?.value);
  }, []);

  return (
    <Container>
      <div>
        <Title>
          <Logo />
          <p>
            osu
            <span>!</span>
            maps
          </p>
        </Title>
        <SearchBox isFocused={isSearchBoxFocused} isFilled={isSearchBoxFilled}>
          <FiSearch />
          <input
            placeholder="Search"
            onFocus={handleSearchBoxFocus}
            onBlur={handleSearchBoxBlur}
            spellCheck={false}
            ref={searchBoxRef}
          />
        </SearchBox>
      </div>
    </Container>
  );
};

export default Header;
