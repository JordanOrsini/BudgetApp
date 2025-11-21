import {useContext, useEffect, useState} from "react";
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Category from "./Category";
import CategoriesContext from "./CategoriesContext";

/* 
   Class representing the AddCategory modal of the application.
*/
const AddCategory = ({modalVisibility, setVisibility, setSelectionInput, setSelectedButton, categoryToEdit, clearCategoryToEdit}) => {
  const categoriesContext = useContext(CategoriesContext);
  const [nameInput, setNameInput] = useState("");
  const [inErrorName, setInErrorName] = useState(false);

  useEffect(() => {
    if (categoryToEdit) {
      setNameInput(categoryToEdit.getName());
    }
  }, [categoryToEdit]);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  const validateNameInput = (processedNameInput) => {
    let Success = true;

    if (processedNameInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (processedNameInput.includes(';')) {
      console.log("Invalid character found: ';'\n");
      Success = false;
    }

    let duplicateFound = false;
    categoriesContext.categoryData.map((element) => {
      if (element.getName() === processedNameInput)
        duplicateFound = true;
    })

    if (duplicateFound) {
      console.log("Duplicate category name found!\n");
      Success = false;
    }

    return Success;
  }

  const createNewCategory = () => {
    const processedNameInput = nameInput.trim().toUpperCase();
    if (categoryToEdit && categoryToEdit.getName() === processedNameInput) {
      closeModal();
      return;
    }

    if (!validateNameInput(processedNameInput)) {
      console.log("Name invalid!\n");
      setInErrorName(true);
      return;
    }

    if (categoryToEdit) {
      categoryToEdit.setName(processedNameInput);
      categoriesContext._setCategoryData([...categoriesContext.categoryData]);
    }
    else {
      categoriesContext._setCategoryData([...categoriesContext.categoryData, new Category({name: processedNameInput,
                                                                                           iconPath: "none.svg"
                                                                                          })]);

      setSelectionInput(processedNameInput);
      setSelectedButton(categoriesContext.categoryData.length); 
    }

    closeModal();
  }

  const clearModal = () => {
    setNameInput("");
    setInErrorName(false);
  }

  const closeModal = () => {
    clearModal();

    if (categoryToEdit)
      clearCategoryToEdit();

    setVisibility(false);
  }

  const onTextChange = (text) => {
    setNameInput(text);
  }

  const removeItemHandler = () => {
    const modifiedCategoryArray = [...categoriesContext.categoryData];
    modifiedCategoryArray.splice(categoriesContext.categoryData.indexOf(categoryToEdit), 1);
    categoriesContext._setCategoryData(modifiedCategoryArray);

    closeModal();
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={modalVisibility} transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={[styles.addCategoryModal, categoryToEdit && styles.edit]}>
          <Pressable style={({pressed}) => [styles.smallButton, styles.decline, pressed && styles.pressed]} onPress={() => closeModal()}>
            <Text>x</Text>
          </Pressable>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]} defaultValue={nameInput} placeholder={"Name"} onChangeText={(text) => onTextChange(text)} />
          <View style={styles.modalButtonsContainer}>
            {categoryToEdit &&
              <Pressable style={({pressed}) => [styles.standardButton, styles.decline, pressed && styles.pressed]} onPress={() => removeItemHandler()}>
                <Text>Delete</Text>
              </Pressable>
            } 
            <Pressable style={({pressed}) => [styles.standardButton, styles.accept, pressed && styles.pressed]} onPress={() => createNewCategory()}>
              <Text>Confirm</Text>
            </Pressable>
          </View>
        </View>    
      </View>    
    </Modal>
  );
}

export default AddCategory;