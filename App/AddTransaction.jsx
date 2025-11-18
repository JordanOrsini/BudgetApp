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
const AddTransaction = ({modalVisibility, setVisibility, transactionToEdit, clearTransactionToEdit}) => {
  const categoriesContext = useContext(CategoriesContext);
  const transactionsContext = useContext(TransactionsContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("NONE");
  const [dateInput, setDateInput] = useState("");

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorAmount, setInErrorAmount] = useState(false);
  const [inErrorDate, setInErrorDate] = useState(false);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (transactionToEdit) {
      setNameInput(transactionToEdit.getName());
      setAmountInput(transactionToEdit.getAmount());
      setCategoryInput(transactionToEdit.getCategory().getName());
      setDateInput(transactionToEdit.getTransactionDate());
    }
  }, [transactionToEdit]);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  useEffect(() => {
    setInErrorAmount(false);
  }, [amountInput]);

  useEffect(() => {
    setInErrorDate(false);
  }, [dateInput]);

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

  const validateInputs = (processedNameInput) => {
    let Success = true;

    if (!validateNameInput(processedNameInput)) {
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
    const processedNameInput = nameInput.trim();

    if (transactionToEdit && 
        transactionToEdit.getName() === processedNameInput &&
        transactionToEdit.getAmount() == amountInput &&
        transactionToEdit.getCategory().getName() === categoryInput &&
        transactionToEdit.getTransactionDate() == dateInput) {
      closeModal();
      return;
    }

    if (!validateInputs(processedNameInput))
      return;

    if (transactionToEdit) {
      transactionToEdit.setName(processedNameInput);
      transactionToEdit.setAmount(parseFloat(amountInput));
      transactionToEdit.setTransactionDate(parseInt(dateInput));

      const categoryObject = categoriesContext.findCategoryByName(categoryInput);
      transactionToEdit.setCategory(categoryObject);

      transactionsContext._setUserData([...transactionsContext.userData]);
    }
    else {
      const categoryObject = categoriesContext.findCategoryByName(categoryInput);
      const newTransaction = new Transaction({name: processedNameInput, 
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

    if (transactionToEdit)
      clearTransactionToEdit();

    setVisibility(false);
  }

  const onTextChange = (text, id) => {
    switch(id) {
      case ("nameInput"):
        setNameInput(text);
        break;
      case ("amountInput"):
        setAmountInput(text);
        break;
      case ("dateInput"):
        setDateInput(text);
        break;
      default:
        break;
    }
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={modalVisibility} transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={[styles.addTransactionModal, transactionToEdit ? styles.edit : '', hidden ? styles.hide : '']}>
          <TextInput style={[styles.textInput, inErrorName ? styles.decline : '']} defaultValue={nameInput} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={[styles.textInput, inErrorAmount ? styles.decline : '']} defaultValue={amountInput.toString()} placeholder="Amount" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <Categories setSelection={setCategoryInput} defaultSelection={transactionToEdit ? categoriesContext.categoryData.indexOf(transactionToEdit.getCategory()) : 0} setHidden={setHidden} />
          <TextInput style={[styles.textInput, inErrorDate ? styles.decline : '']} defaultValue={dateInput.toString()} placeholder="Date" onChangeText={(text, id) => onTextChange(text, "dateInput")} />
          <View style={styles.modalButtonsContainer}> 
            <Pressable style={({pressed}) => [styles.modalButton, styles.accept, pressed ? styles.pressed : '']} onPress={() => createNewTransaction()}>
              <Text>Submit</Text>
            </Pressable>
            <Pressable style={({pressed}) => [styles.modalButton, styles.decline, pressed ? styles.pressed : '']} onPress={() => closeModal()}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>    
      </View>    
    </Modal>
  );
}

export default AddTransaction;