import {Component} from 'react';
import {Text, View} from "react-native";
import {styles} from "./Style";

import AddTransaction from "./AddTransaction";
import SelectableButton from './SelectableButton';

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
          <SelectableButton style={styles.button} selected={true} onPress={() => this.props.navigation.navigate('Overview')}>
            <Text>Overview</Text>
          </SelectableButton>
          <SelectableButton style={styles.button} onPress={() => this.props.navigation.navigate('Budget')}>
            <Text>Budget</Text>
          </SelectableButton>
          <SelectableButton style={styles.button} onPress={() => this.setModalVisibility(true)}>
            <Text>+</Text>
          </SelectableButton>
          <SelectableButton style={styles.button} onPress={() => this.props.navigation.navigate('Transactions')}>
            <Text>Transactions</Text>
          </SelectableButton>
          <SelectableButton style={styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
            <Text>Settings</Text>
          </SelectableButton>
        </View>

      </View>
    );
  }
}

export default Navigation;