import {useEffect, useState} from "react";
import {Image, Pressable, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import MenuModal from "./MenuModal";

const Navigation = ({state, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState(0);
  const [editObject, setEditObject] = useState(null);
  const [transferContent, setTransferContent] = useState(null);

  const _setContent = (newContent, newEditObject, newTransferContent) => {
    console.log("newContent: " + newContent + " newEditObject: " + newEditObject + " newTransferContent: " + newTransferContent);

    setModalVisible(true);
    setContent(newContent);

    if (newEditObject)
      setEditObject(newEditObject);
    else
      setEditObject(null);

    if (newTransferContent)
      setTransferContent(newTransferContent);
    else
      setTransferContent(null);
  }

  const _setModalVisible = (isVisible) => {
    setModalVisible(isVisible);

    if (isVisible === false) {
      setEditObject(null);
      setContent(0);
    }
  }

  useEffect(() => {
    navigation.navigate("Overview", {setModalContent: _setContent});
  }, []);

  // Function that returns the navigation component.
  return (
    <SafeAreaView style={styles.modalNavContainer}> 
      {modalVisible &&     
      <MenuModal setVisibility={_setModalVisible}
                 content={content} 
                 setContent={_setContent}
                 editObject={editObject}
                 transferContent={transferContent} />
      }

      <View style={styles.navigationContainer}>
        <Pressable style={({pressed}) => [styles.navButtonLeft, (state.index === 0) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Overview", {setModalContent: _setContent})}>
          <Image style={styles.icon}
                 source={require("./icons/homeIcon.png")}
                 alt="Overview" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddleLeft, (state.index === 1) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Budget", {setModalContent: _setContent})}>
          <Image style={styles.icon}
                 source={require("./icons/budgetIcon.png")}
                 alt="Budget" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddle, pressed && styles.pressed]}
                   onPress={() => _setContent(0)}>
          <Image style={styles.icon}
                 source={require("./icons/plusIcon.png")}
                 alt="+" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonMiddleRight, (state.index === 2) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Transactions", {setModalContent: _setContent})}>
          <Image style={styles.icon}
                 source={require("./icons/transactionIcon.png")}
                 alt="Transactions" />
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButtonRight, (state.index === 3) && styles.selected, pressed && styles.pressed]}
                   onPress={() => navigation.navigate("Settings", {setModalContent: _setContent})}>
          <Image style={styles.icon}
                 source={require("./icons/settingsIcon.png")}
                 alt="Settings" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Navigation;