import {Component} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";
import {SafeAreaView} from 'react-native-safe-area-context';

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
      <SafeAreaView style={styles.modalNavContainer}>      
        <AddTransaction modalVisibility={this.state.modalVisible} setVisibility={this.setModalVisibility}/>

        <View style={styles.navigationContainer}>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonLeft, (this.props.state.index === 0) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Overview')}>
            <Text>Overview</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddleLeft, (this.props.state.index === 1) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Budget')}>
            <Text>Budget</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddle, pressed ? styles.pressed : '']} onPress={() => this.setModalVisibility(true)}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonMiddleRight, (this.props.state.index === 2) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Transactions')}>
            <Text>Transactions</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.navButton, styles.navButtonRight, (this.props.state.index === 3) ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.props.navigation.navigate('Settings')}>
            <Text>Settings</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}

export default Navigation;