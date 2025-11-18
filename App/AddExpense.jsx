import {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Expense from './Expense';

const AddExpense = ({modalVisibility, setVisibility}) => {
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [intervalInput, setIntervalInput] = useState("");

  const closeModal = () => {
    setVisibility(false);
  }

  const createNewExpense= () => {
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
        setIntervalInput(text);
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
          <TextInput style={styles.textInput} placeholder="Name" onChangeText={(text, id) => onTextChange(text, "nameInput")} />
          <TextInput style={styles.textInput} placeholder="Amount" onChangeText={(text, id) => onTextChange(text, "amountInput")} />
          <TextInput style={styles.textInput} placeholder="Interval" onChangeText={(text, id) => onTextChange(text, "intervalInput")} />
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