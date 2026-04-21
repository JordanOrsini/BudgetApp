import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Category from "./Category";
import CategoriesContext from "./CategoriesContext";
import IconSelectionList from "./IconSelectionList";
import BottomSheetContext from "./BottomSheetContext";

/**
 * Add category bottom sheet component.
 * Represents the page for the BottomSheet component allowing the user to create or edit a category
 * for their transaction.
 * 
 * @param {Object} props
 * @param {Category} props.categoryToEdit Represents a category object. If this parameter is 
 *                                        present, the component is put into "edit" mode.
 * @param {Transaction} props.transferContent Represents a temporary transaction object whose data 
 *                                            should be transfered back to the 
 *                                            AddTransactionBottomSheet component upon submission
 *                                            or backing out of this component.
 * 
 * @returns {JSX.Element} The BottomSheet category page.
 */
const AddCategoryBottomSheet = ({categoryToEdit, transferContent}) => {
  const categoriesContext = useContext(CategoriesContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  // @type {string} Name of the category to create or edit.
  const [nameInput, setNameInput] = useState("");
  // @type {boolean} Indicates if the name of the category to create or edit is in error.
  const [inErrorName, setInErrorName] = useState(false);
  // @type {string} The icon path of the selected category icon.
  const [selectedIcon, setSelectedIcon] = useState("noneIcon.png");

  // When the category name input is modified, set its error state to false.
  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  // When the category to edit is modified, copy its data into our local variables.
  useEffect(() => {
    if (categoryToEdit) {
      setNameInput(categoryToEdit.getName());
      setSelectedIcon(categoryToEdit.getIconPath())
    }
  }, [categoryToEdit]);

  // Function that clears our local variables.
  const clearModal = () => {
    setNameInput("");
    setSelectedIcon("noneIcon.png");

    setInErrorName(false);
  }

  // Function called when we want to close the modal. If we were in "edit" mode, we close the 
  // BottomSheet. Otherwise, we reopen the AddTransactionBottomSheet and transfer back its 
  // corresponding data.
  const closeModal = () => {
    clearModal();

    if (categoryToEdit)
      bottomSheetContext.bottomSheetRef.current?.close();
    else
      bottomSheetContext._setContent("Transaction", transferContent.transactionToEdit, transferContent);
  }

  // Function called that creates or saves changes to a category object.
  const createNewCategory = () => {
    // Convert local variables to upper case before calling validations.
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
      if (transferContent)
        transferContent.category = processedNameInput;
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

  return (
    <View style={[styles.bottomSheetContent, categoryToEdit && styles.edit]}>
      {categoryToEdit &&
      <Text style={styles.bottomSheetHeaderText}>Edit Category</Text>
      }
      {!categoryToEdit &&
      <Text style={styles.bottomSheetHeaderText}>Add Category</Text>
      }
          
      <View>
        <Text style={styles.inputHeaderText}>Name:</Text>
        <TextInput style={[styles.textInput, inErrorName ? styles.decline : {borderWidth: 0}]}
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
                   onPress={() => bottomSheetContext._setContent("Transaction", transferContent.transactionToEdit, transferContent)}>
          <Image style={styles.icon}
                 source={require("./icons/backIcon.png")}
                 alt="Back" />
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

export default AddCategoryBottomSheet;