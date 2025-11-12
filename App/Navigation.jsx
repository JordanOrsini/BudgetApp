import {Component} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddTransaction from "./AddTransaction";

/* 
   Class representing the navigation component of the application.
*/
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false, 
    };
  }

  setModalVisibility = (visibility) => {
    this.setState({modalVisible: visibility});
  }

  // Function that returns the navigation component.
  render () {
    return (
      <View style={styles.modalNavContainer}>
       
        <AddTransaction modalVisibility={this.state.modalVisible} setVisibility={this.setModalVisibility}/>

        <View style={styles.navigation}>
          <Pressable style={({pressed}) => pressed ? [styles.button, styles.selected] : styles.button} onPress={() => this.props.navigation.navigate('Overview')}>
            <Text>Overview</Text>
          </Pressable>
          <Pressable style={({pressed}) => pressed ? [styles.button, styles.selected] : styles.button} onPress={() => this.props.navigation.navigate('Budget')}>
            <Text>Budget</Text>
          </Pressable>
          <Pressable style={({pressed}) => pressed ? [styles.button, styles.selected] : styles.button} onPress={() => this.setModalVisibility(true)}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={({pressed}) => pressed ? [styles.button, styles.selected] : styles.button} onPress={() => this.props.navigation.navigate('Transactions')}>
            <Text>Transactions</Text>
          </Pressable>
          <Pressable style={({pressed}) => pressed ? [styles.button, styles.selected] : styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
            <Text>Settings</Text>
          </Pressable>
        </View>

      </View>
    );
  }
}

export default Navigation;