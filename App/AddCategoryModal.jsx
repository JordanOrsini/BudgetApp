import {useContext, useEffect, useState} from "react";
import {Image, Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Category from "./Category";
import CategoriesContext from "./CategoriesContext";
import IconSelectionList from "./IconSelectionList";

const AddCategoryModal = ({setVisibility, categoryToEdit, setContent}) => {
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
      setVisibility(false);
    else
      setContent(2);
  }

  const createNewCategory = () => {
    const processedNameInput = nameInput.trim().toUpperCase();

    if (!validateNameInput(processedNameInput)) {
      console.log("Name invalid!\n");
      setInErrorName(true);
      return;
    }
    
    if (categoryToEdit && 
        categoryToEdit.getName() === processedNameInput &&
        categoryToEdit.getIconPath() === selectedIcon) {
      closeModal();
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

    if (categoryToEdit &&
        categoryToEdit.getName() !== processedNameInput) {
      let duplicateFound = false;
      categoriesContext.categoryData.map((element) => {
        if (element.getName() === processedNameInput)
          duplicateFound = true;
      })

      if (duplicateFound) {
        console.log("Duplicate category name found!\n");
        Success = false;
      }
    }

    return Success;
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.bottomSheetContent, categoryToEdit && styles.edit]}>
      {categoryToEdit &&
      <Text style={styles.modalHeaderText}>Edit Category</Text>
      }
      {!categoryToEdit &&
      <Text style={styles.modalHeaderText}>Add Category</Text>
      }
          
      <View>
        <Text style={styles.inputHeaderText}>Name:</Text>
        <TextInput style={[styles.textInput, inErrorName && styles.decline]}
                   defaultValue={nameInput} 
                   placeholder="Enter category name..."
                   onChangeText={(text) => onTextChange(text)} />

        <Text style={styles.inputHeaderText}>Icon:</Text>
        <IconSelectionList setSelection={setSelectedIcon} 
                           defaultSelection={selectedIcon} />
      </View>
      <View style={styles.horizontalContainer}>
        {categoryToEdit &&
        <Pressable style={({pressed}) => [styles.button, styles.decline, pressed && styles.pressed]} 
                   onPress={() => removeItemHandler()}>
          <Image style={styles.icon}
                 source={require("./icons/deleteIcon.png")}
                 alt="Delete" />
        </Pressable>
        }
        {!categoryToEdit &&
        <Pressable style={({pressed}) => [styles.button, styles.edit, pressed && styles.pressed]} 
                   onPress={() => setContent(2)}>
          <Image style={styles.icon}
                 source={require("./icons/backIcon.png")}
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
  );
}

export default AddCategoryModal;