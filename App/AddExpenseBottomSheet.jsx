import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Expense from "./Expense";
import IntervalsList from "./IntervalsList";
import ExpensesContext from "./ExpensesContext";
import BottomSheetContext from "./BottomSheetContext";

const AddExpenseBottomSheet = ({expenseToEdit}) => {
  const expensesContext = useContext(ExpensesContext);
  const bottomSheetContext = useContext(BottomSheetContext);

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
    bottomSheetContext.bottomSheetRef.current?.close();
  }

  const createNewExpense = (addAnother = false) => {
    const processedNameInput = nameInput.trim();
    const processedAmountInput = parseFloat(parseFloat(amountInput).toFixed(2));

    if (!validateInputs(processedNameInput))
      return;

    if (expenseToEdit && 
        expenseToEdit.getName() === processedNameInput &&
        expenseToEdit.getAmount() == processedAmountInput &&
        expenseToEdit.getInterval() === intervalInput) {
      closeModal();
      return;
    }

    if (expenseToEdit) {
      expenseToEdit.setName(processedNameInput);
      expenseToEdit.setAmount(processedAmountInput);
      expenseToEdit.setInterval(intervalInput);

      expensesContext._setExpenseData([...expensesContext.expenseData]);
    }
    else {
      const newExpenseObject = new Expense(processedNameInput, // name
                                           processedAmountInput, // amount
                                           intervalInput // interval
                                          );

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

  return (
    <View style={[styles.bottomSheetContent, expenseToEdit && styles.edit]}>          
      {expenseToEdit &&
      <Text style={styles.bottomSheetHeaderText}>Edit Expense</Text>
      }
      {!expenseToEdit &&
      <Text style={styles.bottomSheetHeaderText}>Add Expense</Text>
      }

      <View>
        <Text style={styles.inputHeaderText}>Name:</Text>
        <TextInput style={[styles.textInput, inErrorName ? styles.decline : {borderWidth: 0}]}
                   defaultValue={nameInput}
                   placeholder="Enter expense name..."
                   onChangeText={(text) => onTextChange(text, "nameInput")} />

        <Text style={styles.inputHeaderText}>Amount:</Text>      
        <TextInput style={[styles.textInput, inErrorAmount ? styles.decline : {borderWidth: 0}]}
                   defaultValue={amountInput.toString()}
                   placeholder="Enter dollar amount..."
                   inputMode="decimal"
                   onChangeText={(text) => onTextChange(text, "amountInput")} />

        <Text style={styles.inputHeaderText}>Interval:</Text>
        <IntervalsList setSelection={setIntervalInput} 
                       defaultSelection={intervalInput} />
      </View>
      <View style={styles.horizontalContainer}>
        {expenseToEdit &&
        <Pressable style={({pressed}) => [styles.button, styles.decline, pressed && styles.pressed]} 
                   onPress={() => removeItemHandler()}>
          <Image style={styles.icon}
                 source={require("./icons/deleteIcon.png")}
                 alt="Delete" />
        </Pressable>
        }
        {!expenseToEdit &&
        <Pressable style={({pressed}) => [styles.button, styles.accept, pressed && styles.pressed]} 
                   onPress={() => createNewExpense(true)}>
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
                   onPress={() => createNewExpense()}>
          <Image style={styles.icon}
                 source={require("./icons/checkIcon.png")}
                 alt="Confirm" />
        </Pressable>
      </View>
    </View>
  );
}

export default AddExpenseBottomSheet;