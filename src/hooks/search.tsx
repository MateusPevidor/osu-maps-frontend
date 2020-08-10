import React, { createContext, useState, useCallback, useContext } from 'react';

interface SearchContextData {
  getSearchText(): string;
  setSearchText(text: string): void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

const SearchProvider: React.FC = ({ children }) => {
  const [text, setText] = useState('');

  const setSearchText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const getSearchText = useCallback(() => {
    return text;
  }, [text]);

  return (
    <SearchContext.Provider value={{ setSearchText, getSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

function useSearch(): SearchContextData {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSeach must be used within a SearchProvider');
  }

  return context;
}

export { SearchProvider, useSearch };
