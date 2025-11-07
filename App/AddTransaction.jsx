import {Component} from 'react';
import {Modal, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

/* 
   Class representing the AddTransaction modal of the application.
*/
class AddTransaction extends Component {
  // Function that returns the contents of the AddTransaction modal.
  render () {
    return (
      <Modal visible={this.props.modalVisibility} transparent={true}> 
        <View style={styles.modalPositioning}>    
          <View style={styles.modal}>
            <Pressable style={styles.modalClose} onPress={() => this.props.setVisibility(false)}>
              <Text>X</Text>
            </Pressable>
            <Text>MODAL</Text>
          </View>    
        </View>    
      </Modal>
    );
  }
}

export default AddTransaction;