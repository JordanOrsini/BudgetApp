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
  const defaultData = [new Expense("1", 1, "WEEKLY"),
                       new Expense("2", 2, "WEEKLY"),
                       new Expense("3", 3, "WEEKLY"),
                       new Expense("4", 4, "WEEKLY"),
                       new Expense("5", 5, "BI-MONTHLY"),
                       new Expense("6", 6, "BI-MONTHLY"),
                       new Expense("7", 7, "MONTHLY"),
                       new Expense("8", 8, "MONTHLY"),
                       new Expense("9", 9, "MONTHLY"),
                       new Expense("10", 10, "QUARTERLY"),
                       new Expense("11", 11, "QUARTERLY"),
                       new Expense("12", 12, "QUARTERLY"),
                       new Expense("13", 13, "ANNUALLY"),
                       new Expense("14", 14, "ANNUALLY"),
                       new Expense("15", 15, "ANNUALLY"),
                      ];

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
      const content = await RNFS.readFile(filePath, "utf8");
      console.log("File content:\n", content);
          
      // Split the content by line
      const lines = content.split("\n");
      console.log("Lines:\n", lines); 

      const expenseObjectArray = [];
      lines.map((item) => {
        if (item != "") {      
          const expenseDataArray = item.split(";");
  
          expenseObjectArray.push(new Expense(expenseDataArray[0], // name
                                              parseFloat(expenseDataArray[1]), // amount
                                              expenseDataArray[2] // interval
                                             )); 
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
    defaultData,
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