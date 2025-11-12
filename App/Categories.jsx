import {Component} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddCategory from './AddCategory';
import CategoriesContext from './CategoriesContext';
import SelectableButton from './SelectableButton';

/* 
   Class representing the Category class of the application.
*/
class Categories extends Component {
  static contextType = CategoriesContext;

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,   
    };
  }

  getCategories = () => {
    return (
      this.context.categoryData.map((category, index) => (
        <SelectableButton key={index} style={styles.categoryButtons} selected={index === 0 ? true : false} onPress={() => this.onSelectionChange(category.getName())}><Text>{category.getName()}</Text></SelectableButton>
      ))
    );
  }

  onSelectionChange = (categoryName) => {
    this.props.setSelection(categoryName);
  }

  setModalVisibility = (visibility) => {
    this.setState({modalVisible: visibility});
  }

  render () {
    return (
      <View>
        <AddCategory modalVisibility={this.state.modalVisible} setVisibility={this.setModalVisibility}/>
        <View style={styles.categoryContainer}>
          {this.getCategories()}       
          <Pressable style={({pressed}) => pressed ? [styles.addCategoryButton, styles.pressed] : styles.addCategoryButton} onPress={() => this.setModalVisibility(true)}><Text>+</Text></Pressable>
        </View>
      </View>
    );
  }
}

export default Categories;