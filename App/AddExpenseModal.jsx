import {useContext, useEffect, useState} from "react";
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Expense from "./Expense";
import IntervalsList from "./IntervalsList";
import ExpensesContext from "./ExpensesContext";

const AddExpenseModal = ({modalVisibility, setVisibility, expenseToEdit, clearExpenseToEdit}) => {
  const expensesContext = useContext(ExpensesContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [intervalInput, setIntervalInput] = useState("NONE");

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorAmount, setInErrorAmount] = useState(false);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);
  
  useEffect(() => {
    setInErrorAmount(false);
  }, [amountInput]);

  useEffect(() => {
    if (expenseToEdit) {
      setNameInput(expenseToEdit.getName());
      setAmountInput(expenseToEdit.getAmount());
      setIntervalInput(expenseToEdit.getInterval());
    }
  }, [expenseToEdit]);

  const clearModal = () => {
    setNameInput("");
    setAmountInput("");
    setIntervalInput("NONE");

    setInErrorName(false);
    setInErrorAmount(false);
  }

  const closeModal = () => {
    clearModal();

    if (expenseToEdit)
      clearExpenseToEdit();

    setVisibility(false);
  }

  const createNewExpense = (addAnother = false) => {
    const processedNameInput = nameInput.trim();
    const processedAmountInput = parseFloat(amountInput).toFixed(2);

    if (expenseToEdit && 
        expenseToEdit.getName() === processedNameInput &&
        expenseToEdit.getAmount() == processedAmountInput &&
        expenseToEdit.getInterval() === intervalInput) {
      closeModal();
      return;
    }

    if (!validateInputs(processedNameInput, processedAmountInput))
      return;

    if (expenseToEdit) {
      expenseToEdit.setName(processedNameInput);
      expenseToEdit.setAmount(processedAmountInput);
      expenseToEdit.setInterval(intervalInput);

      expensesContext._setExpenseData([...expensesContext.expenseData]);
    }
    else {
      const newExpenseObject = new Expense({name: processedNameInput,
                                            amount: processedAmountInput,
                                            interval: intervalInput
                                           });

      expensesContext._setExpenseData([newExpenseObject, ...expensesContext.expenseData]);
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

  const removeItemHandler = () => {
    const modifiedExpenseArray = [...expensesContext.expenseData];
    modifiedExpenseArray.splice(expensesContext.expenseData.indexOf(expenseToEdit), 1);
    expensesContext._setExpenseData(modifiedExpenseArray);

    closeModal();
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

  const validateInputs = (processedNameInput, processedAmountInput) => {
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

    return Success;
  }

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

  return (
    <Modal visible={modalVisibility} 
           transparent={true} >
      <View style={styles.modalPositioning}>
        <View style={[styles.modal, expenseToEdit && styles.edit]}>
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
          <IntervalsList setSelection={setIntervalInput} 
                         defaultSelection={intervalInput} />
          <View style={styles.modalButtonsContainer}>
            {expenseToEdit &&
            <Pressable style={({pressed}) => [styles.button, styles.decline, pressed && styles.pressed]} 
                       onPress={() => removeItemHandler()}>
              <Text>Delete</Text>
            </Pressable>
            }
            {!expenseToEdit &&
            <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                       onPress={() => createNewExpense(true)}>
              <Text>Add another</Text>
            </Pressable>
            }         
            <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                       onPress={() => createNewExpense()}>
              <Text>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddExpenseModal;