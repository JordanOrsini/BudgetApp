import { Component } from 'react';
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Style";

/* 
   Class representing the navigation component of the application.
*/
class Navigation extends Component {
  // Function that returns the navigation component.
  render () {
    return (
      <SafeAreaView style={ styles.navigation }>
        <Pressable style={ styles.button } onPress={ () => this.props.navigation.navigate('Overview') }>
          <Text>Overview</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={ () => this.props.navigation.navigate('Budget') }>
          <Text>Budget</Text>
        </Pressable>
        <Pressable style={ styles.button }>
          <Text>+</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={ () => this.props.navigation.navigate('Transactions') }>
          <Text>Transactions</Text>
        </Pressable>
        <Pressable style={ styles.button } onPress={ () => this.props.navigation.navigate('Settings') }>
          <Text>Settings</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

export default Navigation;