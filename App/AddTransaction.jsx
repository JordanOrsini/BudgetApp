import React, {Component} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Transaction from './Transaction'
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the AddTransaction modal of the application.
*/
class AddTransaction extends Component {
  static contextType = TransactionsContext;

  constructor(props) {
    super(props);

    this.state = {
      nameInput: "",
      amountInput: "",
      categoryInput: "",
      dateInput: "",
    };
  }

  validateInputs = () => {
    if (this.state.nameInput.includes(';') || this.state.amountInput.includes(';') || this.state.categoryInput.includes(';') || this.state.dateInput.includes(';')) {
      console.log("Input invalid ';' found!\n");
      return false;
    }

    return true;
  }

  createNewTransaction = () => {
    if (!this.validateInputs())
      return;

    const newTransaction = new Transaction({name: this.state.nameInput, 
                                            amount: parseFloat(this.state.amountInput), 
                                            category: parseInt(this.state.categoryInput), 
                                            transactionDate: parseInt(this.state.dateInput), 
                                            creationDate: parseInt(0)
                                           }); 
                                       
    this.context._setUserData([newTransaction, ...this.context.userData]);
    this.props.setVisibility(false);   
  }

  onTextChange = (text, id) => {
    console.log("Text: " + text + "\n");
    console.log("Value: " + id + "\n");
    
    this.setState({[id]: text});
  }

  // Function that returns the contents of the AddTransaction modal.
  render () {
    return (
      <Modal visible={this.props.modalVisibility} transparent={true}> 
        <View style={styles.modalPositioning}>    
          <View style={styles.modal}>
            <TextInput style={styles.textInput} placeholder="Name" onChangeText={(text, id) => this.onTextChange(text, "nameInput")} />
            <TextInput style={styles.textInput} placeholder="Amount" onChangeText={(text, id) => this.onTextChange(text, "amountInput")} />
            <TextInput style={styles.textInput} placeholder="Category" onChangeText={(text, id) => this.onTextChange(text, "categoryInput")} />
            <TextInput style={styles.textInput} placeholder="Date" onChangeText={(text, id) => this.onTextChange(text, "dateInput")} />
            <View style={styles.modalButtonsContainer}> 
              <Pressable style={styles.modalAccept} onPress={() => this.createNewTransaction()}>
                <Text>Y</Text>
              </Pressable>
              <Pressable style={styles.transactionRemove} onPress={() => this.props.setVisibility(false)}>
                <Text>N</Text>
              </Pressable>
            </View>
          </View>    
        </View>    
      </Modal>
    );
  }
}

export default AddTransaction;