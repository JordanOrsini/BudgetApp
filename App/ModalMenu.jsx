import {useState} from 'react';
import {Modal, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddExpense from './AddExpense';
import AddTransaction from './AddTransaction';

const ModalMenu = ({modalVisibility, setVisibility}) => {
  const [addExpenseVisibility, setAddExpenseVisibility] = useState(false);
  const [addtransactionVisibility, setAddTransactionVisibility] = useState(false);

  const closeModal = () => {
    setVisibility(false);
  }

  return (
    <Modal visible={modalVisibility} transparent={true} >
      <View style={styles.modalPositioning}>
        <View style={[styles.modalMenuModal, (addExpenseVisibility || addtransactionVisibility) ? styles.hide : '']}>
          <AddExpense modalVisibility={addExpenseVisibility} setVisibility={setAddExpenseVisibility} />
          <AddTransaction modalVisibility={addtransactionVisibility} setVisibility={setAddTransactionVisibility} />
          <View style={styles.modalButtonsContainer}>
            <Pressable style={({pressed}) => [styles.categoryButtons, pressed ? styles.pressed : '']} onPress={() => setAddExpenseVisibility(true)}>
              <Text>Expense</Text>
            </Pressable>
            <Pressable style={({pressed}) => [styles.categoryButtons, pressed ? styles.pressed : '']} onPress={() => setAddTransactionVisibility(true)}>
              <Text>Transaction</Text>
            </Pressable>
          </View>
          <Pressable style={({pressed}) => [styles.modalButton, styles.decline, pressed ? styles.pressed : '']} onPress={() => closeModal()}>
            <Text>x</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default ModalMenu;