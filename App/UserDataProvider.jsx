import {useEffect, useState} from "react";

import User from "./User";
import RNFS from "react-native-fs";
import UserDataContext from "./UserDataContext";

const UserDataProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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

  // File path of our saved user data. Not user accessible. Cross-platform.
  const filePath = RNFS.DocumentDirectoryPath + "/UserData.txt";
  const defaultData = new User("Jordan", 100000);

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
        await RNFS.writeFile(filePath, "New user;0", "utf8");
        console.log("File created successfully.");
      }
    } 
    catch (error) {
      console.error("Error checking or creating file: ", error);
      return;
    }

    await readAndParseFile();
  }

  async function readAndParseFile() {
    try {
      const content = await RNFS.readFile(filePath, "utf8");
      console.log("File content:\n", content);
          
      // Split the content by line
      const data = content.split(";");
      console.log("Data:\n", data); 

      const newUserObject = new User(data[0], // name
                                     parseFloat(data[1]) // salary
                                    ); 

      // Update state with parsed data
      setUserData(newUserObject);
    } 
    catch (error) {
      console.error("Error reading file: ", error); 
      return;
    }
  }

  // Custom setter, writing memory's contents to file before updating userData.
  const _setUserData = (newData) => {
    const stringToWrite = newData.toString();
    console.log("stringToWrite:\n", stringToWrite);

    try {
      RNFS.writeFile(filePath, stringToWrite, "utf8");
    }
    catch (error) {
      console.error("Error writing to file: ", error);
      return;
    }
    
    setUserData(newData);
  }

  // Values to expose in our context.
  const contextValue = {
    userData,
    _setUserData,
    defaultData,
  }

  if (loading) {
    return;
  }

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataProvider;