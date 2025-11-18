import {useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Expense from './Expense';
import Intervals from './Intervals';

const AddExpense = ({modalVisibility, setVisibility, setParentVisibility}) => {
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [intervalInput, setIntervalInput] = useState("NONE");
  const [dateInput, setDateInput] = useState("NONE");

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

  const closeModal = () => {
    setNameInput("");
    setAmountInput("");
    setIntervalInput("NONE");

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

  const createNewExpense= () => {
    const processedNameInput = nameInput.trim();

    if (!validateInputs(processedNameInput))
      return;

    const newExpenseObject = new Expense({name: processedNameInput,
                                          amount: parseFloat(amountInput),
                                          interval: intervalInput,
                                          startDate: parseInt(dateInput),
                                         });

    console.log("New expense object!: " + newExpenseObject);

    setParentVisibility(false);
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
      case ("dateInput"): {
        setDateInput(text);
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
        <View style={styles.addTransactionModal}>
          <TextInput style={[styles.textInput, inErrorName ? styles.decline : '']} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={[styles.textInput, inErrorAmount ? styles.decline : '']} placeholder="Amount" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <Intervals setSelection={setIntervalInput}/>
          <TextInput style={[styles.textInput, inErrorDate ? styles.decline : '']} placeholder="Start date" onChangeText={(text, id) => onTextChange(text, "dateInput")} />
          <View style={styles.modalButtonsContainer}>
            <Pressable style={({pressed}) => [styles.modalButton, styles.accept, pressed ? styles.pressed : '']} onPress={() => createNewExpense()}>
              <Text>+</Text>
            </Pressable>
            <Pressable style={({pressed}) => [styles.modalButton, styles.decline, pressed ? styles.pressed : '']} onPress={() => closeModal()}>
              <Text>x</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddExpense;