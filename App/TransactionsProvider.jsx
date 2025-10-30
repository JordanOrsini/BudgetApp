import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

import RNFS from 'react-native-fs';
import TransactionsContext from './TransactionsContext';

const TransactionsProvider = ({children}) => {
  const [userData, setUserData] = useState([]);

  const contextValue = {
    userData,
    setUserData,
  };

  const readAndParseFile = () => {
    // Path to the text file (Android only)
    if (Platform.OS === 'android') {
      const path = 'UserData.txt';
      RNFS.readFileAssets(path, 'utf8')
        .then((content) => {
          console.log('File content:\n', content); 
          
          // Split the content by line and parse it into objects
          const lines = content.split('\n');
          console.log('Lines:\n', lines); 

          /*const parsedData = lines.map((line) => {
            const [name, amount, category, date, recurring] = line.split(',');
          });

          console.log('Parsed data:\n', parsedData);*/

          // Update state with parsed data
          setUserData(lines);
        })
        .catch((error) => {
          console.error('Error reading file:', error); 
          return;
        });
      } 
  };

  // Read the file on component mount
  useEffect(() => {
    readAndParseFile();
  }, []);

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

export default TransactionsProvider;