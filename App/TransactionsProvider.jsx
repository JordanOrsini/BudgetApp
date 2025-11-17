import {useContext, useEffect, useState} from 'react';

import RNFS from 'react-native-fs';
import Transaction from './Transaction';
import CategoriesContext from './CategoriesContext';
import TransactionsContext from './TransactionsContext';

const TransactionsProvider = ({children}) => {
  const categoriesContext = useContext(CategoriesContext);
  const [userData, setUserData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check if user saved data exists on component mount.
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAndCreateFile();
      }
      catch (error) {
        console.error('Error in useEffect:', error);
      }
      finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    refreshData();
  }, [categoriesContext.categoryData]);

  const _setTotalAmount = (newData) => {
    let newTotalAmount = 0;
    
    newData.map((element) => {
      newTotalAmount = newTotalAmount + element.getAmount();
    });

    setTotalAmount(newTotalAmount);
  }

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
    _setTotalAmount(newData);
  }

  const refreshData = () => {
    userData.map((element) => {
      if (categoriesContext.findCategory(element.getCategory().getName()) === undefined)
        element.setCategory(categoriesContext.findCategory("Uncategorized"));
    })

    setUserData([...userData]);
  }

  // Values to expose in our context.
  const contextValue = {
    userData,
    _setUserData,
    totalAmount,
  }

  // File path of our saved user data. Not user accessible. Cross-platform.
  const filePath = RNFS.DocumentDirectoryPath + '/UserData.txt'

  // [TODO]: Temporary data for testing.
  const defaultFileContents = '1;1;Home;1;1\n2;2;Home;2;2\n3;3;Home;3;3\n4;4;Home;4;4\n' +
                              '5;5;Work;5;5\n6;6;Work;6;6\n7;7;Work;7;7\n8;8;Work;8;8\n9;9;Work;9;9\n' +
                              '10;10;School;10;10\n11;11;School;11;11\n12;12;School;12;12\n' +
                              '13;13;School;13;13\n14;14;School;14;14\n15;15;School;15;15';

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
          const transactionDataArray = item.split(';');

          const categoryObject = categoriesContext.findCategory(transactionDataArray[2]);   
          transactionObjectArray.push(new Transaction({name: transactionDataArray[0], 
                                                       amount: parseFloat(transactionDataArray[1]), 
                                                       category: categoryObject, 
                                                       transactionDate: parseInt(transactionDataArray[3]), 
                                                       creationDate: parseInt(transactionDataArray[4])}
                                                     )); 
        }
      });

      // Update state with parsed data
      setUserData(transactionObjectArray);
      _setTotalAmount(transactionObjectArray);
    } 
    catch (error) {
      console.error('Error reading file:', error); 
      return;
    }
  }

  if (loading) {
    return;
  }

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

export default TransactionsProvider;