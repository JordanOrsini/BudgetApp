import {useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";
import {SafeAreaView} from 'react-native-safe-area-context';

import ModalMenu from './ModalMenu';

/* 
   Class representing the navigation component of the application.
*/
const Navigation = ({state, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function that returns the navigation component.
  return (
    <SafeAreaView style={styles.modalNavContainer}>      
      <ModalMenu modalVisibility={modalVisible} setVisibility={setModalVisible} />

      <View style={styles.navigationContainer}>
        <Pressable style={({pressed}) => [styles.navButton, styles.navButtonLeft, (state.index === 0) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => navigation.navigate('Overview')}>
          <Text>Overview</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddleLeft, (state.index === 1) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => navigation.navigate('Budget')}>
          <Text>Budget</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddle, pressed ? styles.pressed : '']} onPress={() => setModalVisible(true)}>
          <Text>+</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddleRight, (state.index === 2) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => navigation.navigate('Transactions')}>
          <Text>Transactions</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.navButton, styles.navButtonRight, (state.index === 3) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => navigation.navigate('Settings')}>
          <Text>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Navigation;