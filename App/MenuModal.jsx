import {useRef, useState} from "react";
import {Pressable, Text, View} from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import AddTransactionModal from "./AddTransactionModal";

const MenuModal = ({setVisibility}) => {
  const [addExpenseVisibility, setAddExpenseVisibility] = useState(false);
  const [addtransactionVisibility, setAddTransactionVisibility] = useState(false);

  const bottomSheetRef = useRef(null);
  const handleSheetChanges = (index) => {
    if (index === -1) 
      setVisibility(false);
  }

  return (   
    <BottomSheet style={styles.bottomSheetPositioning}
                 backgroundStyle={styles.bottomSheet}
                 onChange={handleSheetChanges}
                 ref={bottomSheetRef}
                 detached={true}
                 enablePanDownToClose={true}>     
      <BottomSheetView style={styles.bottomSheetContent}>
        <AddExpenseModal modalVisibility={addExpenseVisibility}
                         setVisibility={setAddExpenseVisibility} />
        <AddTransactionModal modalVisibility={addtransactionVisibility}
                             setVisibility={setAddTransactionVisibility} />
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
      </BottomSheetView>
    </BottomSheet>
  );
}

export default MenuModal;