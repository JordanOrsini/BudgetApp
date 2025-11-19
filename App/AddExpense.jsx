import {useContext, useEffect, useState} from "react";
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Expense from "./Expense";
import Intervals from "./Intervals";
import ExpensesContext from "./ExpensesContext";

const AddExpense = ({modalVisibility, setVisibility, setParentVisibility, expenseToEdit, clearExpenseToEdit}) => {
  const expensesContext = useContext(ExpensesContext);

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [intervalInput, setIntervalInput] = useState("NONE");

  const [inErrorName, setInErrorName] = useState(false);
  const [inErrorAmount, setInErrorAmount] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setNameInput(expenseToEdit.getName());
      setAmountInput(expenseToEdit.getAmount());
      setIntervalInput(expenseToEdit.getInterval());
    }
  }, [expenseToEdit]);

  useEffect(() => {
    setInErrorName(false);
  }, [nameInput]);
  
  useEffect(() => {
    setInErrorAmount(false);
  }, [amountInput]);

  const closeModal = () => {
    setNameInput("");
    setAmountInput("");
    setIntervalInput("NONE");

    setInErrorName(false);
    setInErrorAmount(false);

    if (expenseToEdit)
      clearExpenseToEdit();
    else
      setParentVisibility(false);

    setVisibility(false);
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

  const createNewExpense= () => {
    const processedNameInput = nameInput.trim();
    const processedAmountInput = amountInput.toString().trim();

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
      expenseToEdit.setAmount(parseFloat(processedAmountInput));
      expenseToEdit.setInterval(intervalInput);

      expensesContext._setExpenseData([...expensesContext.expenseData]);
    }
    else {
      const newExpenseObject = new Expense({name: processedNameInput,
                                            amount: parseFloat(processedAmountInput),
                                            interval: intervalInput
                                           });

      expensesContext._setExpenseData([newExpenseObject, ...expensesContext.expenseData]);
    }

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

  return (
    <Modal visible={modalVisibility} transparent={true} >
      <View style={styles.modalPositioning}>
        <View style={[styles.addTransactionModal, expenseToEdit && styles.edit]}>
          <TextInput style={[styles.textInput, inErrorName && styles.decline]} defaultValue={nameInput} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={[styles.textInput, inErrorAmount && styles.decline]} defaultValue={amountInput.toString()} placeholder="Amount" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <Intervals setSelection={setIntervalInput} defaultSelection={expenseToEdit ? intervalInput : "NONE"} />
          <View style={styles.modalButtonsContainer}>
            <Pressable style={({pressed}) => [styles.modalButton, styles.accept, pressed && styles.pressed]} onPress={() => createNewExpense()}>
              <Text>Submit</Text>
            </Pressable>
            <Pressable style={({pressed}) => [styles.modalButton, styles.decline, pressed && styles.pressed]} onPress={() => closeModal()}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddExpense;