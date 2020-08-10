import React, { useState, useCallback, useRef } from 'react';

import { FiSearch } from 'react-icons/fi';

import { Container, Title, SearchBox } from './styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import { useSearch } from '../../hooks/search';

interface Props {
  isFixed?: boolean;
}

const Header: React.FC<Props> = ({ isFixed }) => {
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const [searchBoxText, setSearchBoxText] = useState('');

  const { setSearchText } = useSearch();

  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  const [isSearchBoxFilled, setIsSearchBoxFilled] = useState(false);

  const handleSearchBoxFocus = useCallback(() => {
    setIsSearchBoxFocused(true);
  }, []);

  const handleSearchBoxBlur = useCallback(() => {
    setIsSearchBoxFocused(false);

    setIsSearchBoxFilled(!!searchBoxRef.current?.value);
  }, []);

  const handleSearchBoxInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setSearchBoxText(e.currentTarget.value);
      setSearchText(e.currentTarget.value);
    },
    [setSearchText],
  );

  return (
    <Container isFixed={isFixed}>
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
            onChange={handleSearchBoxInput}
            spellCheck={false}
            ref={searchBoxRef}
            value={searchBoxText}
          />
        </SearchBox>
      </div>
    </Container>
  );
};

export default Header;
