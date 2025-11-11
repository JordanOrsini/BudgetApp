import {Component} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import CategoriesContext from './CategoriesContext';

/* 
   Class representing the Category class of the application.
*/
class Categories extends Component {
  static contextType = CategoriesContext;

  getCategory = (choiceInteger) => {
    if (choiceInteger < this.context.categoryData.length)
      return this.context.categoryData[choiceInteger];

    return "N/A";
  }

  getCategories = () => {
    return (
      this.context.categoryData.map((category, index) => (
        <Pressable key={index} style={styles.categoryButtons} onPress={() => this.onSelectionChange(index)}><Text>{category}</Text></Pressable>
      ))
    );
  }

  onSelectionChange = (index) => {
    this.props.setSelection(index);
  }

  addCategory = () => {
    this.context._setCategoryData([...this.context.categoryData, "Category " + (this.context.categoryData.length + 1)])
  }

  render () {
    return (
      <View>
        {this.getCategories()}
        <Pressable style={styles.addCategoryButton} onPress={() => this.addCategory()}><Text>+</Text></Pressable>
      </View>
    );
  }
}

export default Categories;