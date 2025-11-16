import {useContext, useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Category from './Category';
import CategoriesContext from './CategoriesContext';

/* 
   Class representing the AddCategory modal of the application.
*/
const AddCategory = (props) => {
  const categoriesContext = useContext(CategoriesContext);
  const [nameInput, setNameInput] = useState("");
  const [inError, setInError] = useState(false);

  useEffect(() => {
    setInError(false);
  }, [nameInput]);

  const validateNameInput = () => {
    let Success = true;
    const stringToValidate = nameInput;

    if (stringToValidate.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (stringToValidate.includes(';')) {
      console.log("Invalid character found: ';'\n");
      Success = false;
    }

    let duplicateFound = false;
    categoriesContext.categoryData.map((element) => {
      if (element.getName() === stringToValidate)
        duplicateFound = true;
    })

    if (duplicateFound) {
      console.log("Duplicate category name found!\n");
      Success = false;
    }

    setInError(!Success);
    return Success;
  }

  const createNewCategory = () => {
    if (!validateNameInput())
      return;
         
    props.setSelected(categoriesContext.categoryData.length);
    categoriesContext._setCategoryData([...categoriesContext.categoryData, new Category({name: nameInput})]);
    closeModal();
  }

  const closeModal = () => {
    setNameInput("");
    setInError(false);
    props.setVisibility(false);
  }

  const onTextChange = (text) => {
    setNameInput(text);
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={props.modalVisibility} transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={styles.addCategoryModal}>
          <TextInput style={[styles.textInput, inError ? styles.decline : '']} placeholder="Name" onChangeText={(text) => onTextChange(text)} />
          <View style={styles.modalButtonsContainer}> 
            <Pressable style={({pressed}) => [styles.modalButton, styles.accept, pressed ? styles.pressed : '']} onPress={() => createNewCategory()}>
              <Text>Y</Text>
            </Pressable>
            <Pressable style={({pressed}) => [styles.modalButton, styles.decline, pressed ? styles.pressed : '']} onPress={() => closeModal()}>
              <Text>N</Text>
            </Pressable>
          </View>
        </View>    
      </View>    
    </Modal>
  );
}

export default AddCategory;