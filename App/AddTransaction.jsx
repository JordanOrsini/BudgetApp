import {useContext, useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Categories from './Categories';
import Transaction from './Transaction';
import CategoriesContext from './CategoriesContext';
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the AddTransaction modal of the application.
*/
const AddTransaction = ({modalVisibility, setVisibility, transactionToEdit}) => {
  const categoriesContext = useContext(CategoriesContext);
  const transactionsContext = useContext(TransactionsContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("NONE");
  const [dateInput, setDateInput] = useState("");

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorAmount, setInErrorAmount] = useState(false);
  const [inErrorDate, setInErrorDate] = useState(false);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  useEffect(() => {
    setInErrorAmount(false);
  }, [amountInput]);

  useEffect(() => {
    setInErrorDate(false);
  }, [dateInput]);

  const validateNameInput = () => {
    let Success = true;

    if (nameInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (nameInput.includes(';')) {
      console.log("Invalid character found: ';'\n");
      Success = false;
    }

    return Success;
  }

  const validateAmountInput = () => {
    let Success = true;

    if (amountInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(amountInput)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  const validateDateInput = () => {
    let Success = true;

    if (dateInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(dateInput)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  const validateInputs = () => {
    let Success = true;
    if (!validateNameInput()) {
      console.log("Name invalid!\n");
      setInErrorName(true);
      Success = false;
    }

    if (!validateAmountInput()) {
      console.log("Amount invalid!\n");
      setInErrorAmount(true);
      Success = false;
    }

    if (!validateDateInput()) {
      console.log("Date invalid!\n");
      setInErrorDate(true);
      Success = false;
    }

    return Success;
  }

  const createNewTransaction = () => {
    if (!validateInputs())
      return;

    if (transactionToEdit) {
      transactionToEdit.setName(nameInput);
      transactionToEdit.setAmount(parseFloat(amountInput));

      const categoryObject = categoriesContext.findCategory(categoryInput);
      transactionToEdit.setCategory(categoryObject);
      
      transactionToEdit.setTransactionDate(parseInt(dateInput));

      transactionsContext._setUserData([...transactionsContext.userData]);
    }
    else {
      const categoryObject = categoriesContext.findCategory(categoryInput);
      const newTransaction = new Transaction({name: nameInput, 
                                              amount: parseFloat(amountInput), 
                                              category: categoryObject, 
                                              transactionDate: parseInt(dateInput), 
                                              creationDate: parseInt(0)
                                             }); 
                                       
      transactionsContext._setUserData([newTransaction, ...transactionsContext.userData]);
    }

    closeModal();
  }

  const closeModal = () => {
    setNameInput("")
    setAmountInput("");
    setCategoryInput("NONE");
    setDateInput("");  

    setInErrorName(false);
    setInErrorAmount(false);
    setInErrorDate(false);

    setVisibility(false);
  }

  const onTextChange = (text, id) => {
    switch(id) {
      case("nameInput"):
        setNameInput(text.trim());
      case("amountInput"):
        setAmountInput(text.trim());
      case("dateInput"):
        setDateInput(text.trim());
    }
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={modalVisibility} transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={[styles.addTransactionModal, transactionToEdit ? styles.edit : '']}>
          <TextInput style={[styles.textInput, inErrorName ? styles.decline : '']} defaultValue={transactionToEdit ? transactionToEdit.getName() : ''} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={[styles.textInput, inErrorAmount ? styles.decline : '']} defaultValue={transactionToEdit ? transactionToEdit.getAmount().toString() : ''} placeholder="Amount" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <Categories setSelection={setCategoryInput} defaultSelection={transactionToEdit ? categoriesContext.categoryData.indexOf(transactionToEdit.getCategory()) : 0} />
          <TextInput style={[styles.textInput, inErrorDate ? styles.decline : '']} defaultValue={transactionToEdit ? transactionToEdit.getTransactionDate().toString() : ''} placeholder="Date" onChangeText={(text, id) => onTextChange(text, "dateInput")} />
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