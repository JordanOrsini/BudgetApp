import {Component} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import Categories from './Categories'
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
      categoryInput: "None",
      dateInput: "",
    };
  }

  setSelectedCategory = (newSelection) => {
    this.setState({categoryInput: newSelection});
  }

  validateNameInput = () => {
    let Success = true;
    const stringToValidate = this.state.nameInput;

    if (stringToValidate.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (stringToValidate.includes(';')) {
      console.log("Invalid character found: ';'\n");
      Success = false;
    }

    return Success;
  }

  validateAmountInput = () => {
    let Success = true;
    const stringToValidate = this.state.amountInput;

    if (stringToValidate.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(stringToValidate)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  validateDateInput = () => {
    let Success = true;
    const stringToValidate = this.state.dateInput;

    if (stringToValidate.length === 0) {
      console.log("Blank string!\n");
      Success = false;
    }

    if (isNaN(stringToValidate)) {
      console.log("Not a number!\n");
      Success = false;
    }

    return Success;
  }

  validateInputs = () => {
    let Success = true;
    if (!this.validateNameInput()) {
      console.log("Name invalid!\n");
      Success = false;
    }

    if (!this.validateAmountInput()) {
      console.log("Amount invalid!\n");
      Success = false;
    }

    if (!this.validateDateInput()) {
      console.log("Date invalid!\n");
      Success = false;
    }

    return Success;
  }

  createNewTransaction = () => {
    if (!this.validateInputs())
      return;

    const newTransaction = new Transaction({name: this.state.nameInput, 
                                            amount: parseFloat(this.state.amountInput), 
                                            category: this.state.categoryInput, 
                                            transactionDate: parseInt(this.state.dateInput), 
                                            creationDate: parseInt(0)
                                           }); 
                                       
    this.context._setUserData([newTransaction, ...this.context.userData]);
    this.closeModal();
  }

  closeModal = () => {
    this.setState({nameInput: "",
                   amountInput: "",
                   categoryInput: "None",
                   dateInput: ""});
    this.props.setVisibility(false);
  }

  onTextChange = (text, id) => {
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
            <Categories setSelection={this.setSelectedCategory} />
            <TextInput style={styles.textInput} placeholder="Date" onChangeText={(text, id) => this.onTextChange(text, "dateInput")} />
            <View style={styles.modalButtonsContainer}> 
              <Pressable style={styles.modalAccept} onPress={() => this.createNewTransaction()}>
                <Text>Y</Text>
              </Pressable>
              <Pressable style={styles.transactionRemove} onPress={() => this.closeModal()}>
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