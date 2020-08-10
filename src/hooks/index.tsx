import React from 'react';

import { SearchProvider } from './search';

const AppProvider: React.FC = ({ children }) => (
  <SearchProvider>{children}</SearchProvider>
);

export default AppProvider;
