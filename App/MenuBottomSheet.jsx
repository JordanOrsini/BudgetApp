import {useContext} from "react";
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import BottomSheetContext from "./BottomSheetContext";

const MenuBottomSheet = () => {
  const bottomSheetContext = useContext(BottomSheetContext);

  return (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.bottomSheetHeaderText}>Add new...?</Text>
      <View style={styles.horizontalContainer}>
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                   onPress={() => bottomSheetContext._setContent("Expense")}>
          <Text>Expense</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                   onPress={() => bottomSheetContext._setContent("Transaction")}>
          <Text>Transaction</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default MenuBottomSheet;