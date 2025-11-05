import {useEffect, useState} from 'react';

import RNFS from 'react-native-fs';
import Transaction from './Transaction'
import TransactionsContext from './TransactionsContext';

const TransactionsProvider = ({children}) => {
  const [userData, setUserData] = useState([]);

  // Custom setter, writing memory's contents to file before updating userData.
  const _setUserData = (newData) => {

    let stringToWrite = "";
    newData.map((item) => {
      stringToWrite = stringToWrite + item.toString() + "\n";
    });

    console.log('stringToWrite:\n', stringToWrite);

    try {
      RNFS.writeFile(filePath, stringToWrite, 'utf8');
    }
    catch (error) {
      console.error('Error writing to file:', error);
      return;
    }
    
    setUserData(newData);
  }

  // Values to expose in our context.
  const contextValue = {
    userData,
    _setUserData,
  }

  // File path of our saved user data. Not user accessible. Cross-platform.
  const filePath = RNFS.DocumentDirectoryPath + '/UserData.txt'

  // [TODO]: Temporary data for testing.
  const defaultFileContents = '0,0,0,0,0\n1,1,1,1,1\n2,2,2,2,2\n3,3,3,3,3\n4,4,4,4,4\n' +
                              '5,5,5,5,5\n6,6,6,6,6\n7,7,7,7,7\n8,8,8,8,8\n9,9,9,9,9\n' +
                              '10,10,10,10,10\n11,11,11,11,11\n12,12,12,12,12\n' +
                              '13,13,13,13,13\n14,14,14,14,14\n15,15,15,15,15';

  // Function that verifies if user saved data exists. If not, it will create a blank file.
  async function checkAndCreateFile() {
    try {
      // Check if file exists.
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        console.log('File exists:', filePath);
      } 
      else {
        // File does not exists, we must create it.
        console.log('File does not exist, creating it:', filePath);

        // Create a blank file.
        await RNFS.writeFile(filePath, '', 'utf8');
        console.log('File created successfully.');
      }
    } 
    catch (error) {
      console.error('Error checking or creating file:', error);
      return;
    }

    await readAndParseFile();
  }

  async function readAndParseFile() {
    try {
      // [TODO]: Temporarily write to file for testing.
      await RNFS.writeFile(filePath, defaultFileContents, 'utf8');

      const content = await RNFS.readFile(filePath, 'utf8');
      console.log('File content:\n', content);
          
      // Split the content by line
      const lines = content.split('\n');
      console.log('Lines:\n', lines); 

      const transactionObjectArray = [];
      lines.map((item) => {
        if (item != "") {      
        const transactionDataArray = item.split(',');
        transactionObjectArray.push(new Transaction({name: transactionDataArray[0], 
                                                     amount: parseInt(transactionDataArray[1]), 
                                                     category: parseInt(transactionDataArray[2]), 
                                                     transactionDate: parseInt(transactionDataArray[3]), 
                                                     creationDate: parseInt(transactionDataArray[4])}
                                                    )); 
        }  
      });


      // Update state with parsed data
      setUserData(transactionObjectArray);
    } 
    catch (error) {
      console.error('Error reading file:', error); 
      return;
    }
  }

  // Check if user saved data exists on component mount.
  useEffect(() => {
    checkAndCreateFile();
  }, []);

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

export default TransactionsProvider;