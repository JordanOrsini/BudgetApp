import {useState} from 'react';

import TransactionsContext from './TransactionsContext';

const TransactionsProvider = ({children}) => {
  const [userData, setUserData] = useState([[1,1,1,1,1], [2,2,2,2,2], [3,3,3,3,3], [4,4,4,4,4], [5,5,5,5,5]]);

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

export default TransactionsProvider;