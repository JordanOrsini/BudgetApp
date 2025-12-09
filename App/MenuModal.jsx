import {Pressable, Text, View} from "react-native";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from "./Style";

import BottomSheet from "@gorhom/bottom-sheet";
import AddExpenseModal from "./AddExpenseModal";
import AddCategoryModal from "./AddCategoryModal";
import AddTransactionModal from "./AddTransactionModal";

const MenuModal = ({setVisibility, content, setContent, editObject}) => {
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
          <AddExpenseModal setVisibility={setVisibility}
                           expenseToEdit={editObject} />
        );
      }
      case 2: {
        return (
          <AddTransactionModal setVisibility={setVisibility}
                               transactionToEdit={editObject}
                               setContent={setContent} />
        );
      }
      case 3: {
        return (
          <AddCategoryModal setVisibility={setVisibility}
                            categoryToEdit={editObject}
                            setContent={setContent} />
        );
      }
    }
  }

  return ( 
    <BottomSheet style={(content === 0) ? styles.bottomSheetPositioning :
                        (content === 1) ? styles.bottomSheetPositioningExpense : 
                        (content === 3) ? styles.bottomSheetPositioningCategory :
                        (editObject)    ? styles.bottomSheetPositioningTransactionEdit : 
                                          styles.bottomSheetPositioningTransaction}
                 backgroundStyle={[styles.bottomSheet, editObject && styles.edit]}
                 onChange={handleSheetChanges}
                 detached={true}
                 enablePanDownToClose={true}
                 overDragResistanceFactor={2}>     
      <BottomSheetView>
        {getContent()}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default MenuModal;