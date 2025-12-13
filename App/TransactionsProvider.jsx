import {useContext, useEffect, useState} from "react";

import RNFS from "react-native-fs";
import Transaction from "./Transaction";
import CategoriesContext from "./CategoriesContext";
import TransactionsContext from "./TransactionsContext";

const TransactionsProvider = ({children}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactionData, setTransactionData] = useState([]);

  // Check if user saved data exists on component mount.
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAndCreateFile();
      }
      catch (error) {
        console.error("Error in useEffect: ", error);
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

  const refreshData = () => {
    transactionData.map((element) => {
      if (categoriesContext.findCategoryByName(element.getCategory().getName()) === undefined)
        element.setCategory(categoriesContext.findCategoryByName("NONE"));
    })

    setTransactionData([...transactionData]);
  }

  // File path of our saved transaction data. Not user accessible. Cross-platform.
  const filePath = RNFS.DocumentDirectoryPath + "/TransactionData.txt";

  // [TODO]: Temporary data for testing.
  const defaultFileContents = "1;1;HOME;1598051730000;1598051730000\n" + 
                              "2;2;HOME;1598051730000;1598051730000\n" + 
                              "3;3;HOME;1598051730000;1598051730000\n" +
                              "4;4;HOME;1598051730000;1598051730000\n" +
                              "5;5;WORK;1598051730000;1598051730000\n" +
                              "6;6;WORK;1598051730000;1598051730000\n" +
                              "7;7;WORK;1598051730000;1598051730000\n" +
                              "8;8;WORK;1598051730000;1598051730000\n" +
                              "9;9;WORK;1598051730000;1598051730000\n" +
                              "10;10;SCHOOL;1598051730000;1598051730000\n" +
                              "11;11;SCHOOL;1598051730000;1598051730000\n" +
                              "12;12;SCHOOL;1598051730000;1598051730000\n" +
                              "13;13;CAR;1598051730000;1598051730000\n" +
                              "14;14;CAR;1598051730000;1598051730000\n" +
                              "15;15;CAR;1598051730000;1598051730000";

  // Function that verifies if user saved data exists. If not, it will create a blank file.
  async function checkAndCreateFile() {
    try {
      // Check if file exists.
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        console.log("File exists: ", filePath);
      } 
      else {
        // File does not exists, we must create it.
        console.log("File does not exist, creating it: ", filePath);

        // Create a blank file.
        await RNFS.writeFile(filePath, "", "utf8");
        console.log("File created successfully.");
      }
    } 
    catch (error) {
      console.error("Error checking or creating file: ", error);
      return;
    }

    await readAndParseFile();
  }

  const findTransactionsByCategory = (category) => {
    const filteredData = transactionData.filter(element => 
      element.getCategory() === category
    );
    
    return (filteredData);
  }

  const findTransactionById = (id) => {
    const filteredData = transactionData.filter(element => 
      element.getId() === id
    );

    if (filteredData.length !== 1)
      return;
    
    return (filteredData[0]);
  }

  async function readAndParseFile() {
    try {
      // [TODO]: Temporarily write to file for testing.
      await RNFS.writeFile(filePath, defaultFileContents, "utf8");

      const content = await RNFS.readFile(filePath, "utf8");
      console.log("File content:\n", content);
          
      // Split the content by line
      const lines = content.split("\n");
      console.log("Lines:\n", lines); 

      const transactionObjectArray = [];
      lines.map((item) => {
        if (item != "") {      
          const transactionDataArray = item.split(";");

          const categoryObject = categoriesContext.findCategoryByName(transactionDataArray[2]);   
          transactionObjectArray.push(new Transaction(transactionDataArray[0], // name
                                                      parseFloat(transactionDataArray[1]), // amount
                                                      categoryObject, // category 
                                                      parseInt(transactionDataArray[3]), // transactionDate
                                                      parseInt(transactionDataArray[4]) // creationDate                                        
                                                     )); 
        }
      });

      // Update state with parsed data
      setTransactionData(transactionObjectArray);
      _setTotalAmount(transactionObjectArray);
    } 
    catch (error) {
      console.error("Error reading file: ", error); 
      return;
    }
  }

  const _setTotalAmount = (newData) => {
    let newTotalAmount = 0;
    
    newData.map((element) => {
      newTotalAmount = newTotalAmount + element.getAmount();
    });

    setTotalAmount(newTotalAmount);
  }

  // Custom setter, writing memory's contents to file before updating transactionData.
  const _setTransactionData = (newData) => {
    let stringToWrite = "";
    newData.map((item) => {
      stringToWrite = stringToWrite + item.toString() + "\n";
    });

    console.log("stringToWrite:\n", stringToWrite);

    try {
      RNFS.writeFile(filePath, stringToWrite, "utf8");
    }
    catch (error) {
      console.error("Error writing to file: ", error);
      return;
    }
    
    setTransactionData(newData);
    _setTotalAmount(newData);
  }

  // Values to expose in our context.
  const contextValue = {
    transactionData,
    _setTransactionData,
    totalAmount,
    findTransactionsByCategory,
    findTransactionById,
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