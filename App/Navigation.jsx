import {useState} from "react";
import {Pressable, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from "./Style";

import MenuModal from "./MenuModal";

const Navigation = ({state, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function that returns the navigation component.
  return (
    <SafeAreaView style={styles.modalNavContainer}>      
      <MenuModal modalVisibility={modalVisible} 
                 setVisibility={setModalVisible} />

      <View style={styles.navigationContainer}>
        <Pressable style={({pressed}) => [styles.navButtonLeft, (state.index === 0) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Overview")}>
          <Text>Overview</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddleLeft, (state.index === 1) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Budget")}>
          <Text>Budget</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddle, pressed && styles.pressed]}
                   onPress={() => setModalVisible(true)}>
          <Text>+</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddleRight, (state.index === 2) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Transactions")}>
          <Text>Transactions</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonRight, (state.index === 3) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Settings")}>
          <Text>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Navigation;