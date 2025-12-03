import {useContext, useEffect, useState} from "react";
import {Image, Modal, Pressable, TextInput, View} from "react-native";
import {styles} from "./Style";

import Category from "./Category";
import CategoriesContext from "./CategoriesContext";
import IconSelectionList from "./IconSelectionList";

const AddCategoryModal = ({modalVisibility, setVisibility, setSelectionInput, categoryToEdit, clearCategoryToEdit}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [nameInput, setNameInput] = useState("");
  const [inErrorName, setInErrorName] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("noneIcon.png");

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  useEffect(() => {
    if (categoryToEdit) {
      setNameInput(categoryToEdit.getName());
      setSelectedIcon(categoryToEdit.getIconPath())
    }
  }, [categoryToEdit]);

  const clearModal = () => {
    setNameInput("");
    setSelectedIcon("noneIcon.png");

    setInErrorName(false);
  }

  const closeModal = () => {
    clearModal();

    if (categoryToEdit)
      clearCategoryToEdit();

    setVisibility(false);
  }

  const createNewCategory = () => {
    const processedNameInput = nameInput.trim().toUpperCase();
    
    if (categoryToEdit && 
        categoryToEdit.getName() === processedNameInput &&
        categoryToEdit.getIconPath() === selectedIcon) {
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
      categoryToEdit.setIconPath(selectedIcon);
      categoriesContext._setCategoryData([...categoriesContext.categoryData]);
    }
    else {
      categoriesContext._setCategoryData([...categoriesContext.categoryData, new Category(processedNameInput, // name
                                                                                          selectedIcon // iconPath
                                                                                         )]);

      setSelectionInput(processedNameInput);
    }

    closeModal();
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

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={modalVisibility}
           transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={[styles.modal, categoryToEdit && styles.edit]}>
          <Pressable style={({pressed}) => [styles.smallButton, styles.decline, pressed && styles.pressed]} 
                     onPress={() => closeModal()}>
            <Image style={styles.icon}
                   source={require("./icons/closeIcon.png")}
                   alt="x" />
          </Pressable>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]}
                     defaultValue={nameInput} 
                     placeholder={"Name"} 
                     onChangeText={(text) => onTextChange(text)} />
          <IconSelectionList setSelection={setSelectedIcon} defaultSelection={selectedIcon} />
          <View style={styles.horizontalContainer}>
            {categoryToEdit &&
            <Pressable style={({pressed}) => [styles.button, styles.decline, pressed && styles.pressed]} 
                       onPress={() => removeItemHandler()}>
              <Image style={styles.icon}
                     source={require("./icons/deleteIcon.png")}
                     alt="Delete" />
            </Pressable>
            } 
            <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                       onPress={() => createNewCategory()}>
              <Image style={styles.icon}
                     source={require("./icons/checkIcon.png")}
                     alt="Confirm" />
            </Pressable>
          </View>
        </View>    
      </View>    
    </Modal>
  );
}

export default AddCategoryModal;