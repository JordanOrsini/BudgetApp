import {useContext, useEffect, useState} from "react";

import RNFS from "react-native-fs";
import Category from "./Category";
import Transaction from "./Transaction";
import CategoriesContext from "./CategoriesContext";
import TransactionsContext from "./TransactionsContext";

const TransactionsProvider = ({children}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

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
  const defaultData = [new Transaction("1", 1, new Category("HOME", "homeIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("2", 2, new Category("HOME", "homeIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("3", 3, new Category("HOME", "homeIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("4", 4, new Category("HOME", "homeIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("5", 5, new Category("WORK", "workIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("6", 6, new Category("WORK", "workIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("7", 7, new Category("WORK", "workIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("8", 8, new Category("WORK", "workIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("9", 9, new Category("WORK", "workIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("10", 10, new Category("SCHOOL", "schoolIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("11", 11, new Category("SCHOOL", "schoolIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("12", 12, new Category("SCHOOL", "schoolIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("13", 13, new Category("CAR", "carIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("14", 14, new Category("CAR", "carIcon.png"), 1598051730000, 1598051730000),
                       new Transaction("15", 15, new Category("CAR", "carIcon.png"), 1598051730000, 1598051730000),
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

  const findTransactionById = (id) => {
    const filteredData = transactionData.filter(element => 
      element.getId() === id
    );

    if (filteredData.length !== 1)
      return;
    
    return (filteredData[0]);
  }

  const findTransactionsByCategory = (category) => {
    const filteredData = transactionData.filter(element => 
      element.getCategory() === category
    );
    
    return (filteredData);
  }

  const findTransactionsByName = (name) => {
    let filteredData = [];

    if (name.length === 0)
      return filteredData;

    filteredData = transactionData.filter(element => 
      element.getName().toLowerCase().includes(name.toLowerCase()) || 
      element.getCategory().getName().toLowerCase().includes(name.toLowerCase()) ||
      name[0] === "$" && myNumberFormatter.format(element.getAmount()).includes(name)
    );
    
    return (filteredData);
  }

  async function readAndParseFile() {
    try {
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
    findTransactionsByName,
    defaultData,
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