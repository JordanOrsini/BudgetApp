import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import User from "./User";
import UserDataContext from "./UserDataContext";

const RemoveUserName = ({style}) => {
  const userDataContext = useContext(UserDataContext);

  const [nameInput, setNameInput] = useState("");
  const [inErrorName, setInErrorName] = useState(false);

  useEffect(() => {
    setNameInput(userDataContext.userData.getName());
  }, [userDataContext.userData]);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  const modifyUserName = () => {
    const processedNameInput = nameInput.trim();

    if (userDataContext.userData.getName() === processedNameInput) {
      return;
    }

    if (!validateNameInput(processedNameInput)) {
      console.log("Name invalid!\n");
      setInErrorName(true);
      return;
    }

    userDataContext._setUserData(new User(processedNameInput, // name
                                          userDataContext.userData.getSalary() // salary
                                         )); 
  }

  const onTextChange = (text) => {
    setNameInput(text);
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

  return (
    <View style={[styles.mainBodyContainerSmall, style]}>
      <Text style={styles.subHeaderText}>Modify user name</Text>
      <View style={styles.pageView}>
        <TextInput style={[styles.textInput, inErrorName && styles.decline]}
                   defaultValue={nameInput} 
                   placeholder="User name" 
                   onChangeText={(text) => onTextChange(text)} /> 
        <Pressable style={({pressed}) => [styles.button, styles.edit, pressed && styles.pressed]} 
                   onPress={() => modifyUserName()} >
          <Image style={styles.icon}
                 source={require("./icons/editIcon.png")}
                 alt="Edit" />
        </Pressable> 
      </View>  
    </View>     
  );
}

export default RemoveUserName;