import {useContext, useEffect, useState} from "react";
import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import User from "./User";
import UserDataContext from "./UserDataContext";

const RemoveUserName = ({style}) => {
  const userDataContext = useContext(UserDataContext);

  const [nameInput, setNameInput] = useState(userDataContext.userData.getName());
  const [inErrorName, setInErrorName] = useState(false);

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

    userDataContext._setUserData(new User({name: processedNameInput,
                                           salary: userDataContext.userData.getSalary()}));
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
    <View>
      <View style={[styles.mainBodyContainerMicro, style]}>
        <View style={styles.pageView}>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]}
                     defaultValue={nameInput} 
                     placeholder="Name" 
                     onChangeText={(text) => onTextChange(text)} /> 
          <Pressable style={({pressed}) => [styles.button, styles.edit, pressed && styles.pressed]} 
                     onPress={() => modifyUserName()} >
            <Text>Edit</Text>
          </Pressable> 
        </View>  
      </View>     
    </View>
  );
}

export default RemoveUserName;