import {useContext, useEffect, useRef, useState} from "react";
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {DatePicker} from "@s77rt/react-native-date-picker";
import {styles} from "./Style";

import Transaction from "./Transaction";
import CategoriesList from "./CategoriesList";
import CategoriesContext from "./CategoriesContext";
import TransactionsContext from "./TransactionsContext";

const AddTransactionModal = ({modalVisibility, setVisibility, transactionToEdit, clearTransactionToEdit}) => {
  const categoriesContext = useContext(CategoriesContext);
  const transactionsContext = useContext(TransactionsContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("NONE");
  const [dateInput, setDateInput] = useState(new Date());

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorAmount, setInErrorAmount] = useState(false);

  const [hidden, setHidden] = useState(false);
  const datePickerModal = useRef(null);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  useEffect(() => {
    setInErrorAmount(false);
  }, [amountInput]);

  useEffect(() => {
    if (transactionToEdit) {
      setNameInput(transactionToEdit.getName());
      setAmountInput(transactionToEdit.getAmount());
      setCategoryInput(transactionToEdit.getCategory().getName());
      setDateInput(new Date(transactionToEdit.getTransactionDate()));
    }
  }, [transactionToEdit]);

  const clearModal = () => {
    setNameInput("")
    setAmountInput("");
    setCategoryInput("NONE");
    setDateInput(new Date());

    setInErrorName(false);
    setInErrorAmount(false);
  }

  const closeModal = () => {
    clearModal();

    if (transactionToEdit)
      clearTransactionToEdit();

    setVisibility(false);
  }

  const createNewTransaction = (addAnother = false) => {
    const processedNameInput = nameInput.trim();
    const processedAmountInput = parseFloat(parseFloat(amountInput).toFixed(2));
    const processedDateInput = dateInput.getTime();

    if (transactionToEdit && 
        transactionToEdit.getName() === processedNameInput &&
        transactionToEdit.getAmount() == processedAmountInput &&
        transactionToEdit.getCategory().getName() === categoryInput &&
        transactionToEdit.getTransactionDate() == processedDateInput) {
      closeModal();
      return;
    }

    if (!validateInputs(processedNameInput))
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
                                              creationDate: new Date().getTime()
                                             }); 
                                       
      transactionsContext._setTransactionData([newTransaction, ...transactionsContext.transactionData]);
    }

    if (addAnother)
      clearModal();
    else
      closeModal();
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

    return Success;
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

  // Function that returns the contents of the AddTransaction modal.
  return (
    <Modal visible={modalVisibility}
           transparent={true}> 
      <View style={styles.modalPositioning}>    
        <View style={[styles.modal, transactionToEdit && styles.edit, hidden && styles.hide]}>
          <Pressable style={({pressed}) => [styles.smallButton, styles.decline, pressed && styles.pressed]} 
                     onPress={() => closeModal()}>
            <Text>x</Text>
          </Pressable>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]}
                     defaultValue={nameInput} 
                     placeholder="Name" 
                     onChangeText={(text) => onTextChange(text, "nameInput")} />
          <TextInput style={[styles.textInput, inErrorAmount && styles.decline]} 
                     defaultValue={amountInput.toString()} 
                     placeholder="$ 0,000.00" 
                     onChangeText={(text) => onTextChange(text, "amountInput")} />
          <CategoriesList setSelection={setCategoryInput} 
                          defaultSelection={categoryInput} 
                          setHidden={setHidden} />
          <DatePicker ref={datePickerModal}
                      type="date"
				              value={dateInput}
				              onChange={setDateInput} />    
          <Pressable style={({pressed}) => [styles.button, styles.textInput, pressed && styles.pressed]} 
                     onPress={() => datePickerModal.current?.showPicker()}>
            <View style={styles.modalButtonsContainer}>  
              <Text>{dateInput.toLocaleDateString()}</Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </View>
            </Pressable>        
          {transactionToEdit &&
          <Text style={styles.creationText}>Created on: {new Date(transactionToEdit.getCreationDate()).toDateString()}</Text>
          }

          <View style={styles.modalButtonsContainer}> 
            {transactionToEdit &&
            <Pressable style={({pressed}) => [styles.button, styles.decline, pressed && styles.pressed]} 
                       onPress={() => removeItemHandler()}>
              <Text>Delete</Text>
            </Pressable>
            }
            {!transactionToEdit &&
            <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                       onPress={() => createNewTransaction(true)} >
              <Text>Add another</Text>
            </Pressable>
            }
            <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                       onPress={() => createNewTransaction()}>
              <Text>Confirm</Text>
            </Pressable>
          </View>
        </View>    
      </View>    
    </Modal>
  );
}

export default AddTransactionModal;