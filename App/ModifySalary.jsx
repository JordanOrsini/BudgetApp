import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import User from "./User";
import UserDataContext from "./UserDataContext";

const ModifySalary = ({style}) => {
  const userDataContext = useContext(UserDataContext);

  const [salaryInput, setSalaryInput] = useState("");
  const [inErrorSalary, setInErrorSalary] = useState(false);

  useEffect(() => {
    setSalaryInput(userDataContext.userData.getSalary().toString());
  }, [userDataContext.userData]);

  useEffect(() => {
    setInErrorSalary(false);
  }, [salaryInput]);

  const modifySalary = () => {
    const processedSalaryInput = parseFloat(parseFloat(salaryInput).toFixed(2));

    if (userDataContext.userData.getSalary() === processedSalaryInput) {
      return;
    }

    if (!validateSalaryInput()) {
      console.log("Salary invalid!\n");
      setInErrorSalary(true);
      return;
    }

    userDataContext._setUserData(new User(userDataContext.userData.getName(), // name
                                          processedSalaryInput // salary
                                         ));
  }

  const onTextChange = (text) => {
    setSalaryInput(text);
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
      <Text style={styles.subHeaderText}>Modify salary</Text>
      <View style={styles.pageView}>
        <TextInput style={[styles.textInput, inErrorSalary && styles.decline]}
                   defaultValue={salaryInput} 
                   placeholder="$ 0,000.00" 
                   onChangeText={(text) => onTextChange(text)} /> 
        <Pressable style={({pressed}) => [styles.button, styles.edit, pressed && styles.pressed]} 
                   onPress={() => modifySalary()} >
          <Image style={styles.icon}
                 source={require("./icons/editIcon.png")}
                 alt="Edit" />
        </Pressable> 
      </View>  
    </View>     
  );
}

export default ModifySalary;