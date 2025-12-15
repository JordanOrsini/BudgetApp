import {useContext, useEffect, useRef, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {DatePicker} from "@s77rt/react-native-date-picker";
import {styles} from "./Style";

import Transaction from "./Transaction";
import CategoriesList from "./CategoriesList";
import CategoriesContext from "./CategoriesContext";
import TransactionsContext from "./TransactionsContext";
import BottomSheetContext from "./BottomSheetContext";

const AddTransactionBottomSheet = ({transactionToEdit, transferContent}) => {
  const categoriesContext = useContext(CategoriesContext);
  const transactionsContext = useContext(TransactionsContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("NONE");
  const [dateInput, setDateInput] = useState(new Date());

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorAmount, setInErrorAmount] = useState(false);

  const datePickerModal = useRef(null);

  const myTransferData = {name: nameInput,
                          amount: amountInput,
                          category: categoryInput,
                          date: dateInput,
                          transactionToEdit: transactionToEdit}

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);

  useEffect(() => {
    setInErrorAmount(false);
  }, [amountInput]);

  useEffect(() => {
    if (transferContent) {
      setNameInput(transferContent.name);
      setAmountInput(transferContent.amount);
      setCategoryInput(transferContent.category);
      setDateInput(transferContent.date);
    }
  }, [transferContent]);

  useEffect(() => {
    if (transactionToEdit && !transferContent) {
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
    bottomSheetContext.bottomSheetRef.current?.close();
  }

  const createNewTransaction = (addAnother = false) => {
    const processedNameInput = nameInput.trim();
    const processedAmountInput = parseFloat(parseFloat(amountInput).toFixed(2));
    const processedDateInput = dateInput.getTime();

    if (!validateInputs(processedNameInput))
      return;

    if (transactionToEdit && 
        transactionToEdit.getName() === processedNameInput &&
        transactionToEdit.getAmount() == processedAmountInput &&
        transactionToEdit.getCategory().getName() === categoryInput &&
        transactionToEdit.getTransactionDate() == processedDateInput) {
      closeModal();
      return;
    }

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
      const newTransaction = new Transaction(processedNameInput, // name
                                             processedAmountInput, // amount
                                             categoryObject, // category
                                             processedDateInput, // transactionDate
                                             new Date().getTime() // creationDate
                                            ); 
                                       
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
    <View style={[styles.bottomSheetContent, transactionToEdit && styles.edit]}>
      {transactionToEdit &&
      <Text style={styles.bottomSheetHeaderText}>Edit Transaction</Text>
      }
      {!transactionToEdit &&
      <Text style={styles.bottomSheetHeaderText}>Add Transaction</Text>
      }
          
      <View>
        <Text style={styles.inputHeaderText}>Name:</Text>
        <TextInput style={[styles.textInput, inErrorName ? styles.decline : {borderWidth: 0}]}
                   defaultValue={nameInput} 
                   placeholder="Enter transaction name..." 
                   onChangeText={(text) => onTextChange(text, "nameInput")} />

        <Text style={styles.inputHeaderText}>Amount:</Text>
        <TextInput style={[styles.textInput, inErrorAmount ? styles.decline : {borderWidth: 0}]} 
                   defaultValue={amountInput.toString()} 
                   placeholder="Enter dollar amount..." 
                   onChangeText={(text) => onTextChange(text, "amountInput")} />

        <Text style={styles.inputHeaderText}>Category:</Text>
        <CategoriesList setCategoryInput={setCategoryInput} 
                        defaultSelection={categoryInput} 
                        transferData={myTransferData} />

        <Text style={styles.inputHeaderText}>Date:</Text>
        <DatePicker ref={datePickerModal}
                    type="date"
				            value={dateInput}
				            onChange={setDateInput} />
        <Pressable onPress={() => datePickerModal.current?.showPicker()}>
          {({pressed}) => (
          <View style={[styles.textInputCalendar, pressed && styles.pressed]}>  
            <Text>{dateInput.toLocaleDateString()}</Text>
            <Image style={[styles.icon, styles.calendarIcon]}
                   source={require("./icons/calendarIcon.png")}
                   alt="📅" />
          </View>
          )}
        </Pressable>  
      </View> 
      {transactionToEdit &&
      <Text style={styles.creationText}>Created on: {new Date(transactionToEdit.getCreationDate()).toDateString()}</Text>
      }         
      <View style={styles.horizontalContainer}> 
        {transactionToEdit &&
        <Pressable style={({pressed}) => [styles.button, styles.decline, pressed && styles.pressed]} 
                   onPress={() => removeItemHandler()}>
          <Image style={styles.icon}
                 source={require("./icons/deleteIcon.png")}
                 alt="Delete" />
        </Pressable>
        }
        {!transactionToEdit &&
        <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                   onPress={() => createNewTransaction(true)}>
          <View style={styles.horizontalContainer}>
            <Image style={styles.icon}
                   source={require("./icons/checkIcon.png")}
                   alt="Add another" />
            <Image style={styles.icon}
                   source={require("./icons/plusIcon.png")}
                   alt="Add another" />
          </View>
        </Pressable>
        }
        <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                   onPress={() => createNewTransaction()}>
          <Image style={styles.icon}
                 source={require("./icons/checkIcon.png")}
                 alt="Confirm" />
        </Pressable>
      </View>
    </View>     
  );
}

export default AddTransactionBottomSheet;