import {useContext, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Categories from './Categories';
import Transaction from './Transaction';
import CategoriesContext from './CategoriesContext';
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the AddTransaction modal of the application.
*/
const AddTransaction = (props) => {
  const categoriesContext = useContext(CategoriesContext);
  const transactionsContext = useContext(TransactionsContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Uncategorized");
  const [dateInput, setDateInput] = useState("");

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

    return Success;
  }

  const validateAmountInput = () => {
    let Success = true;
    const stringToValidate = amountInput;

    if (stringToValidate.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(stringToValidate)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  const validateDateInput = () => {
    let Success = true;
    const stringToValidate = dateInput;

    if (stringToValidate.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(stringToValidate)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  const validateInputs = () => {
    let Success = true;
    if (!validateNameInput()) {
      console.log("Name invalid!\n");
      Success = false;
    }

    if (!validateAmountInput()) {
      console.log("Amount invalid!\n");
      Success = false;
    }

    if (!validateDateInput()) {
      console.log("Date invalid!\n");
      Success = false;
    }

    return Success;
  }

  const createNewTransaction = () => {
    if (!validateInputs())
      return;

    const categoryObject = categoriesContext.findCategory(categoryInput);
    const newTransaction = new Transaction({name: nameInput, 
                                            amount: parseFloat(amountInput), 
                                            category: categoryObject, 
                                            transactionDate: parseInt(dateInput), 
                                            creationDate: parseInt(0)
                                           }); 
                                       
    transactionsContext._setUserData([newTransaction, ...transactionsContext.userData]);
    closeModal();
  }

  const closeModal = () => {
    setNameInput("")
    setAmountInput("");
    setCategoryInput("Uncategorized");
    setDateInput("");  

    props.setVisibility(false);
  }

  const onTextChange = (text, id) => {
    switch(id) {
      case("nameInput"):
        setNameInput(text);
      case("amountInput"):
        setAmountInput(text);
      case("dateInput"):
        setDateInput(text);
    }
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={props.modalVisibility} transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={styles.addTransactionModal}>
          <TextInput style={styles.textInput} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={styles.textInput} placeholder="Amount" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <Categories setSelection={setCategoryInput} />
          <TextInput style={styles.textInput} placeholder="Date" onChangeText={(text, id) => onTextChange(text, "dateInput")} />
          <View style={styles.modalButtonsContainer}> 
            <Pressable style={({pressed}) => [styles.modalButton, styles.accept, pressed ? styles.pressed : '']} onPress={() => createNewTransaction()}>
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

export default AddTransaction;