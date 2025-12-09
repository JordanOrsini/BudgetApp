import {Pressable, Text, View} from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import AddTransactionModal from "./AddTransactionModal";

const MenuModal = ({setVisibility, content, setContent, editObject, clearEditObject}) => {
  const handleSheetChanges = (index) => {
    if (index === -1) {
      setVisibility(false);
      clearEditObject();
    }
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
          <AddExpenseModal setVisibility={setVisibility}
                           expenseToEdit={editObject} />
        );
      }
      case 2: {
        return (
          <AddTransactionModal setVisibility={setVisibility}
                               transactionToEdit={editObject} />
        );
      }
    }
  }

  return (   
    <BottomSheet style={(content === 0) ? styles.bottomSheetPositioning :
                        (content === 1) ? styles.bottomSheetPositioningExpense : 
                        (editObject)    ? styles.bottomSheetPositioningTransactionEdit : 
                                          styles.bottomSheetPositioningTransaction}
                 backgroundStyle={[styles.bottomSheet, editObject && styles.edit]}
                 onChange={handleSheetChanges}
                 detached={true}
                 enablePanDownToClose={true}>     
      <BottomSheetView>
        {getContent()}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default MenuModal;