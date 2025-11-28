import {useState} from "react";
import {Modal, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import AddTransactionModal from "./AddTransactionModal";

const MenuModal = ({modalVisibility, setVisibility}) => {
  const [addExpenseVisibility, setAddExpenseVisibility] = useState(false);
  const [addtransactionVisibility, setAddTransactionVisibility] = useState(false);

  const closeModal = () => {
    setVisibility(false);
  }

  return (
    <Modal visible={modalVisibility} 
           transparent={true} >
      <View style={styles.modalPositioning}>
        <View style={[styles.menuModal, (addExpenseVisibility || addtransactionVisibility) && styles.hide]}>
          <AddExpenseModal modalVisibility={addExpenseVisibility} 
                           setVisibility={setAddExpenseVisibility} />
          <AddTransactionModal modalVisibility={addtransactionVisibility}
                               setVisibility={setAddTransactionVisibility} />
          <Pressable style={({pressed}) => [styles.smallButton, styles.decline, pressed && styles.pressed]} 
                     onPress={() => closeModal()}>
            <Text>x</Text>
          </Pressable>
          <View style={styles.modalButtonsContainer}>
            <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                       onPress={() => setAddExpenseVisibility(true)}>
              <Text>Expense</Text>
            </Pressable>
            <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                       onPress={() => setAddTransactionVisibility(true)}>
              <Text>Transaction</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MenuModal;