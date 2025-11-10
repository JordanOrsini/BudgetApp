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

  createNewTransaction = () => {
    const myTransactions = [];
    myTransactions.push(new Transaction({name: this.state.nameInput, 
                                         amount: parseFloat(this.state.amountInput), 
                                         category: parseInt(this.state.categoryInput), 
                                         transactionDate: parseInt(this.state.dateInput), 
                                         creationDate: parseInt(0)}
                                       )); 
                                       
    this.context._setUserData(myTransactions);
    this.props.setVisibility(false);   
  }

  onTextChange = (text, value) => {
    console.log("Text: " + text + "\n");
    console.log("Value: " + value + "\n");
    //const {name, value} = e.target;

    //console.log("Name: " + this.name + "\n");
    //console.log("Value: " + this.value + "\n");
    //this.setState({[this.name]: [this.value]});
  }

  // Function that returns the contents of the AddTransaction modal.
  render () {
    return (
      <Modal visible={this.props.modalVisibility} transparent={true}> 
        <View style={styles.modalPositioning}>    
          <View style={styles.modal}>
            <TextInput style={styles.textInput} placeholder="Name" onChangeText={(text, value) => this.onTextChange(text, value)} />
            <TextInput style={styles.textInput} placeholder="Amount" onChangeText={this.onTextChange()} />
            <TextInput style={styles.textInput} placeholder="Category" onChangeText={this.onTextChange()} />
            <TextInput style={styles.textInput} placeholder="Date" onChangeText={this.onTextChange()} />
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