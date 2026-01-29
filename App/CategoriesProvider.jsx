import {useEffect, useState} from "react";

import RNFS from "react-native-fs";
import Category from "./Category";
import CategoriesContext from "./CategoriesContext";

const CategoriesProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

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

  // File path of our saved category data. Not user accessible. Cross-platform.
  const filePath = RNFS.DocumentDirectoryPath + "/CategoryData.txt";
  const defaultData = [new Category("NONE", "noneIcon.png"),
                       new Category("HOME", "homeIcon.png"),
                       new Category("WORK", "workIcon.png"),
                       new Category("SCHOOL", "schoolIcon.png"),
                       new Category("GROCERIES", "groceriesIcon.png"),
                       new Category("CAR", "carIcon.png"),
                       new Category("ENTERTAINMENT", "entertainmentIcon.png"),
                       new Category("RESTAURANT", "restaurantIcon.png"),
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

  const findCategoryByName = (name) => {
    const filteredData = categoryData.filter(element => 
      element.getName().toLowerCase().includes(name.toLowerCase())
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

      const categoriesArray = [];
      lines.map((item) => {
        if (item != "") {      
          const categoryDataArray = item.split(";");
          categoriesArray.push(new Category(categoryDataArray[0], // name
                                            categoryDataArray[1] // iconPath
                                           )); 
        }
      });

      // Update state with parsed data
      setCategoryData(categoriesArray);
    } 
    catch (error) {
      console.error("Error reading file: ", error); 
      return;
    }
  }

  // Custom setter, writing memory's contents to file before updating categoryData.
  const _setCategoryData = (newData) => {
    let stringToWrite = "";
    newData.map((item) => {
      stringToWrite = stringToWrite + item.toStringCategory() + "\n";
    });

    console.log("stringToWrite:\n", stringToWrite);

    try {
      RNFS.writeFile(filePath, stringToWrite, "utf8");
    }
    catch (error) {
      console.error("Error writing to file: ", error);
      return;
    }
    
    setCategoryData(newData);
  }

  // Values to expose in our context.
  const contextValue = {
    categoryData,
    _setCategoryData,
    findCategoryByName,
    defaultData,
  }

  if (loading) {
    return;
  }

  return (
    <CategoriesContext.Provider value={contextValue}>
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesProvider;