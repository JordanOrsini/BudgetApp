import {Component} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./Style";

import CategoriesContext from './CategoriesContext';

/* 
   Class representing the AddTransaction modal of the application.
*/
class AddCategory extends Component {
  static contextType = CategoriesContext;

  constructor(props) {
    super(props);

    this.state = {
      nameInput: "",
    };
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

  createNewCategory = () => {
    if (!this.validateNameInput())
      return;
                                    
    this.context._setCategoryData([...this.context.categoryData, this.state.nameInput]);
    this.closeModal();
  }

  closeModal = () => {
    this.setState({nameInput: ""});
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
          <View style={styles.addCategoryModal}>
            <TextInput style={styles.textInput} placeholder="Name" onChangeText={(text, id) => this.onTextChange(text, "nameInput")} />
            <View style={styles.modalButtonsContainer}> 
              <Pressable style={styles.modalAccept} onPress={() => this.createNewCategory()}>
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

export default AddCategory;