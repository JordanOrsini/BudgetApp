import {useState} from "react";
import {Modal, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddExpense from "./AddExpense";
import AddTransaction from "./AddTransaction";

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
          <Pressable style={({pressed}) => [styles.smallButton, styles.decline, pressed && styles.pressed]} onPress={() => closeModal()}>
            <Text>x</Text>
          </Pressable>
          <View style={styles.modalMenuContent}>
            <Pressable style={({pressed}) => [styles.standardButton, pressed && styles.pressed]} onPress={() => setAddExpenseVisibility(true)}>
              <Text>Expense</Text>
            </Pressable>
            <Text>OR</Text>
            <Pressable style={({pressed}) => [styles.standardButton, pressed && styles.pressed]} onPress={() => setAddTransactionVisibility(true)}>
              <Text>Transaction</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalMenu;