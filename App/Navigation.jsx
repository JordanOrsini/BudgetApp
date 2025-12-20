import {useContext} from "react";
import {Image, Pressable, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import BottomSheetContext from "./BottomSheetContext";

const Navigation = ({state, navigation}) => {
  const bottomSheetContext = useContext(BottomSheetContext);

  // Function that returns the navigation component.
  return (
    <SafeAreaView style={styles.bottomSheetNavContainer}>
      {bottomSheetContext.BottomSheetBackdrop()}  
      {bottomSheetContext.BottomSheetMain()}
      <View style={styles.navigationBackground} />
      <View style={styles.navigationContainer}>
        <Pressable style={({pressed}) => [styles.navButtonLeft, (state.index === 0) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Overview")}>
          <Image style={styles.icon}
                 source={require("./icons/homeIcon.png")}
                 alt="Overview" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddleLeft, (state.index === 1) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Budget")}>
          <Image style={styles.icon}
                 source={require("./icons/budgetIcon.png")}
                 alt="Budget" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddle, pressed && styles.pressed]}
                   onPress={() => bottomSheetContext._setContent("Menu")}>
          <Image style={styles.icon}
                 source={require("./icons/plusIcon.png")}
                 alt="+" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddleRight, (state.index === 2) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Transactions")}>
          <Image style={styles.icon}
                 source={require("./icons/transactionIcon.png")}
                 alt="Transactions" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonRight, (state.index === 3) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Settings")}>
          <Image style={styles.icon}
                 source={require("./icons/settingsIcon.png")}
                 alt="Settings" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Navigation;