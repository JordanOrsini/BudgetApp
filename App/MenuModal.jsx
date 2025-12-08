import {useCallback, useRef, useState} from "react";
import {Image, Modal, Pressable, Text, View} from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import AddTransactionModal from "./AddTransactionModal";

const MenuModal = ({modalVisibility, setVisibility}) => {
  const [addExpenseVisibility, setAddExpenseVisibility] = useState(false);
  const [addtransactionVisibility, setAddTransactionVisibility] = useState(false);

  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
  }, []);

  const closeModal = () => {
    setVisibility(false);
  }

  return (
    <Modal visible={modalVisibility} 
           transparent={true} >
      <View style={styles.modalPositioning}>
        <BottomSheet ref={bottomSheetRef}
                     onChange={handleSheetChanges}>
          <BottomSheetView>
            <Text>Awesome!</Text>
          </BottomSheetView>
        </BottomSheet>
        <View style={[styles.menuModal, (addExpenseVisibility || addtransactionVisibility) && styles.hide]}>
          <AddExpenseModal modalVisibility={addExpenseVisibility} 
                           setVisibility={setAddExpenseVisibility} />
          <AddTransactionModal modalVisibility={addtransactionVisibility}
                               setVisibility={setAddTransactionVisibility} />
          <Pressable style={({pressed}) => [styles.smallButton, styles.decline, pressed && styles.pressed]} 
                     onPress={() => closeModal()}>
            <Image style={styles.icon}
                   source={require("./icons/closeIcon.png")}
                   alt="x" />
          </Pressable>
          <Text style={styles.modalHeaderText}>Add new...?</Text>
          <View style={styles.horizontalContainer}>
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