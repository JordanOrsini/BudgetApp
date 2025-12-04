import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import User from "./User";
import UserDataContext from "./UserDataContext";

const EditUser = ({style}) => {
  const userDataContext = useContext(UserDataContext);

  const [nameInput, setNameInput] = useState("");
  const [salaryInput, setSalaryInput] = useState("");

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorSalary, setInErrorSalary] = useState(false);

  useEffect(() => {
    setNameInput(userDataContext.userData.getName());
    setSalaryInput(userDataContext.userData.getSalary().toString());
  }, [userDataContext.userData]);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  useEffect(() => {
    setInErrorSalary(false);
  }, [salaryInput]);

  const modifyUser = () => {
    const processedNameInput = nameInput.trim();
    const processedSalaryInput = parseFloat(parseFloat(salaryInput).toFixed(2));

    if (!validateInputs(processedNameInput)) {
      return;
    }

    if (userDataContext.userData.getName() === processedNameInput &&
        userDataContext.userData.getSalary() === processedSalaryInput) {
      return;
    }

    userDataContext._setUserData(new User(processedNameInput, // name
                                          processedSalaryInput // salary
                                         )); 
  }

  const onTextChange = (text, id) => {
    switch (id) {
      case ("nameInput"): {
        setNameInput(text);
        break;
      }
      case ("salaryInput"): {
        setSalaryInput(text);
        break;
      }
      default: {
        break;
      }
    }
  }

  const validateInputs = (processedNameInput) => {
    let Success = true;

    if (!validateNameInput(processedNameInput)) {
      console.log("Name invalid!\n");
      setInErrorName(true);
      Success = false;
    }

    if (!validateSalaryInput()) {
      console.log("Salary invalid!\n");
      setInErrorSalary(true);
      Success = false;
    }

    return Success;
  }

  const validateNameInput = (processedNameInput) => {
    let Success = true;

    if (processedNameInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (processedNameInput.includes(";")) {
      console.log("Invalid character found: ';'\n");
      Success = false;
    }

    return Success;
  }

  const validateSalaryInput = () => {
    let Success = true;

    if (salaryInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(salaryInput)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  return (
    <View style={[styles.mainBodyContainerSmall, style]}>
      <Text style={styles.subHeaderText}>Edit user</Text>
      <View style={styles.pageView}>
        <View>
          <Text style={styles.inputHeaderText}>Username:</Text>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]}
                     defaultValue={nameInput} 
                     placeholder="Enter username..." 
                     onChangeText={(text) => onTextChange(text, "nameInput")} /> 

          <Text style={styles.inputHeaderText}>Salary:</Text>
          <TextInput style={[styles.textInput, inErrorSalary && styles.decline]}
                     defaultValue={salaryInput} 
                     placeholder="Enter dollar amount..." 
                     onChangeText={(text) => onTextChange(text, "salaryInput")} />
        </View>
        <Pressable style={({pressed}) => [styles.button, styles.edit, pressed && styles.pressed]} 
                   onPress={() => modifyUser()} >
          <Image style={styles.icon}
                 source={require("./icons/editIcon.png")}
                 alt="Edit" />
        </Pressable> 
      </View>  
    </View>     
  );
}

export default EditUser;