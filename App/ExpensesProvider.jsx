import {useEffect, useState} from "react";

import RNFS from "react-native-fs";
import Expense from "./Expense";
import ExpensesContext from "./ExpensesContext";

const ExpensesProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpenseData] = useState([]);

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

  // File path of our saved expense data. Not user accessible. Cross-platform.
  const filePath = RNFS.DocumentDirectoryPath + "/ExpenseData.txt";

  // [TODO]: Temporary data for testing.
  const defaultFileContents = "1;1;WEEKLY\n" +
                              "2;2;WEEKLY\n" +
                              "3;3;WEEKLY\n" +
                              "4;4;WEEKLY\n" +
                              "5;5;BI-MONTHLY\n" +
                              "6;6;BI-MONTHLY\n" +
                              "7;7;MONTHLY\n" +
                              "8;8;MONTHLY\n" +
                              "9;9;MONTHLY\n" +
                              "10;10;QUARTERLY\n" +
                              "11;11;QUARTERLY\n" +
                              "12;12;QUARTERLY\n" +
                              "13;13;ANNUALLY\n" +
                              "14;14;ANNUALLY\n" +
                              "15;15;ANNUALLY";

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

  const findExpenseById = (id) => {
    const filteredData = expenseData.filter(element => 
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

      const expenseObjectArray = [];
      lines.map((item) => {
        if (item != "") {      
          const expenseDataArray = item.split(";");
  
          expenseObjectArray.push(new Expense({name: expenseDataArray[0], 
                                               amount: parseFloat(expenseDataArray[1]), 
                                               interval: expenseDataArray[2]
                                              })); 
        }
      });

      // Update state with parsed data
      setExpenseData(expenseObjectArray);
    } 
    catch (error) {
      console.error("Error reading file: ", error); 
      return;
    }
  }

  // Custom setter, writing memory's contents to file before updating transactionData.
  const _setExpenseData = (newData) => {
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
      
    setExpenseData(newData);
  }

  // Values to expose in our context.
  const contextValue = {
    expenseData,
    _setExpenseData,
    findExpenseById,
  }

  if (loading) {
    return;
  }

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesProvider;