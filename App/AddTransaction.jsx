import {useContext, useEffect, useState} from "react";
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Categories from "./Categories";
import Transaction from "./Transaction";
import CategoriesContext from "./CategoriesContext";
import TransactionsContext from "./TransactionsContext";

/* 
   Class representing the AddTransaction modal of the application.
*/
const AddTransaction = ({modalVisibility, setVisibility, setParentVisibility, transactionToEdit, clearTransactionToEdit}) => {
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

  const validateAmountInput = (processedAmountInput) => {
    let Success = true;

    if (processedAmountInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(processedAmountInput)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  const validateDateInput = (processedDateInput) => {
    let Success = true;

    if (processedDateInput.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(processedDateInput)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  const validateInputs = (processedNameInput, processedAmountInput, processedDateInput) => {
    let Success = true;

    if (!validateNameInput(processedNameInput)) {
      console.log("Name invalid!\n");
      setInErrorName(true);
      Success = false;
    }

    if (!validateAmountInput(processedAmountInput)) {
      console.log("Amount invalid!\n");
      setInErrorAmount(true);
      Success = false;
    }

    if (!validateDateInput(processedDateInput)) {
      console.log("Date invalid!\n");
      setInErrorDate(true);
      Success = false;
    }

    return Success;
  }

  const createNewTransaction = (addAnother = false) => {
    const processedNameInput = nameInput.trim();
    const processedAmountInput = parseFloat(amountInput).toFixed(2);
    const processedDateInput = parseInt(dateInput);

    if (transactionToEdit && 
        transactionToEdit.getName() === processedNameInput &&
        transactionToEdit.getAmount() == processedAmountInput &&
        transactionToEdit.getCategory().getName() === categoryInput &&
        transactionToEdit.getTransactionDate() == processedDateInput) {
      closeModal();
      return;
    }

    if (!validateInputs(processedNameInput, processedAmountInput, processedDateInput))
      return;

    if (transactionToEdit) {
      transactionToEdit.setName(processedNameInput);
      transactionToEdit.setAmount(processedAmountInput);
      transactionToEdit.setTransactionDate(processedDateInput);

      const categoryObject = categoriesContext.findCategoryByName(categoryInput);
      transactionToEdit.setCategory(categoryObject);

      transactionsContext._setTransactionData([...transactionsContext.transactionData]);
    }
    else {
      const categoryObject = categoriesContext.findCategoryByName(categoryInput);
      const newTransaction = new Transaction({name: processedNameInput, 
                                              amount: processedAmountInput, 
                                              category: categoryObject, 
                                              transactionDate: processedDateInput,
                                              creationDate: parseInt(0)
                                             }); 
                                       
      transactionsContext._setTransactionData([newTransaction, ...transactionsContext.transactionData]);
    }

    if (addAnother)
      clearModal();
    else
      closeModal();
  }

  const closeModal = () => {
    clearModal();

    if (transactionToEdit)
      clearTransactionToEdit();
    else
      setParentVisibility(false);

    setVisibility(false);
  }

  const clearModal = () => {
    setNameInput("")
    setAmountInput("");
    setCategoryInput("NONE");
    setDateInput("");  

    setInErrorName(false);
    setInErrorAmount(false);
    setInErrorDate(false);
  }

  const onTextChange = (text, id) => {
    switch (id) {
      case ("nameInput"): {
        setNameInput(text);
        break;
      }
      case ("amountInput"): {
        setAmountInput(text);
        break;
      }
      case ("dateInput"): {
        setDateInput(text);
        break;
      }
      default: {
        break;
      }
    }
  }

  // Function that handles the onPress event of a transaction element.
  // The function takes an index and will remove the corresponding transaction object from the transactions array.
  const removeItemHandler = () => {
    const modifiedTransactionArray = [...transactionsContext.transactionData];
    modifiedTransactionArray.splice(transactionsContext.transactionData.indexOf(transactionToEdit), 1);
    transactionsContext._setTransactionData(modifiedTransactionArray);

    closeModal();
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={modalVisibility} transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={[styles.addTransactionModal, transactionToEdit && styles.edit, hidden && styles.hide]}>
          <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed && styles.pressed]} onPress={() => closeModal()}>
            <Text>x</Text>
          </Pressable>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]} defaultValue={nameInput} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={[styles.textInput, inErrorAmount && styles.decline]} defaultValue={amountInput.toString()} placeholder="$ 0,000.00" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <Categories setSelection={setCategoryInput} defaultSelection={transactionToEdit ? categoriesContext.categoryData.indexOf(transactionToEdit.getCategory()) : 0} setHidden={setHidden} />
          <TextInput style={[styles.textInput, inErrorDate && styles.decline]} defaultValue={dateInput.toString()} placeholder="DD/MM/YYYY" onChangeText={(text, id) => onTextChange(text, "dateInput")} />
          {transactionToEdit &&
            <Text style={styles.creationText}>Created on: {transactionToEdit.getCreationDate()}</Text>
          }
          <View style={styles.modalButtonsContainer}> 
            {!transactionToEdit &&
              <Pressable style={({pressed}) => [styles.standardButton, styles.accept, pressed && styles.pressed]} onPress={() => createNewTransaction(true)} >
                <Text>Add another</Text>
              </Pressable>
            }
            {transactionToEdit &&
              <Pressable style={({pressed}) => [styles.standardButton, styles.decline, pressed && styles.pressed]} onPress={() => removeItemHandler()}>
                <Text>Delete</Text>
              </Pressable>
            }
            <Pressable style={({pressed}) => [styles.standardButton, styles.accept, pressed && styles.pressed]} onPress={() => createNewTransaction()}>
              <Text>Confirm</Text>
            </Pressable>
          </View>
        </View>    
      </View>    
    </Modal>
  );
}

export default AddTransaction;