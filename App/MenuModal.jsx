import {useRef, useState} from "react";
import {Pressable, Text, View} from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import AddTransactionModal from "./AddTransactionModal";

const MenuModal = ({setVisibility}) => {
  const [content, setContent] = useState(0);

  const bottomSheetRef = useRef(null);
  const handleSheetChanges = (index) => {
    if (index === -1) 
      setVisibility(false);
  }

  const getContent = () => {
    switch (content) {
      case 0: {
        return (
          <View style={styles.bottomSheetContent}>
            <Text style={styles.modalHeaderText}>Add new...?</Text>
            <View style={styles.horizontalContainer}>
              <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                         onPress={() => setContent(1)}>
                <Text>Expense</Text>
              </Pressable>
              <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                         onPress={() => setContent(2)}>
                <Text>Transaction</Text>
              </Pressable>
            </View>
          </View>
        );
      }
      case 1: {
        return (
          <AddExpenseModal setVisibility={setVisibility} />
        );
      }
      case 2: {
        return (
          <AddTransactionModal setVisibility={setVisibility} />
        );
      }
    }
  }

  return (   
    <BottomSheet style={(content === 0) ? styles.bottomSheetPositioning : (content === 1) ? styles.bottomSheetPositioningExpense : styles.bottomSheetPositioningTransaction}
                 backgroundStyle={styles.bottomSheet}
                 onChange={handleSheetChanges}
                 ref={bottomSheetRef}
                 detached={true}
                 enablePanDownToClose={true}>     
      <BottomSheetView>
        {getContent()}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default MenuModal;