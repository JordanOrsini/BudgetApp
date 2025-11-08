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

    this.nameInputRef = React.createRef();
    this.amountInputRef = React.createRef();
    this.categoryInputRef = React.createRef();
    this.dateInputRef = React.createRef();
  }

  createNewTransaction = () => {
    const myTransactions = [];
    myTransactions.push(new Transaction({name: "Test", 
                                         amount: parseFloat(5000), 
                                         category: parseInt(0), 
                                         transactionDate: parseInt(0), 
                                         creationDate: parseInt(0)}
                                       )); 
                                       
    this.context._setUserData(myTransactions);   
  }

  // Function that returns the contents of the AddTransaction modal.
  render () {
    return (
      <Modal visible={this.props.modalVisibility} transparent={true}> 
        <View style={styles.modalPositioning}>    
          <View style={styles.modal}>
            <TextInput style={styles.textInput} placeholder="Name" ref={this.nameInputRef} />
            <TextInput style={styles.textInput} placeholder="Amount" ref={this.amountInputRef} />
            <TextInput style={styles.textInput} placeholder="Category" ref={this.categoryInputRef} />
            <TextInput style={styles.textInput} placeholder="Date" ref={this.dateInputRef} />
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