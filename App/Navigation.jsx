import {Component} from 'react';
import {Modal, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

/* 
   Class representing the navigation component of the application.
*/
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true, 
    };
  }

  // Function that returns the navigation component.
  render () {
    return (
      <View style={styles.modalNavContainer}>
       
        <Modal visible={this.state.modalVisible} transparent={true}> 
          <View style={styles.modalPositioning}>    
            <View style={styles.modal}>
              <Pressable style={styles.modalClose} onPress={() => this.setState({modalVisible: false})}>
                <Text>X</Text>
              </Pressable>
              <Text>MODAL</Text>
            </View>    
          </View>    
        </Modal>

        <View style={styles.navigation}>
          <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Overview')}>
            <Text>Overview</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Budget')}>
            <Text>Budget</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => this.setState({modalVisible: true})}>
            <Text>+</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Transactions')}>
            <Text>Transactions</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
            <Text>Settings</Text>
          </Pressable>
        </View>

      </View>
    );
  }
}

export default Navigation;