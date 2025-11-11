import {Component} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import CategoriesContext from './CategoriesContext';

/* 
   Class representing the Category class of the application.
*/
class Categories extends Component {
  static contextType = CategoriesContext;

  getCategories = () => {
    return (
      this.context.categoryData.map((category, index) => (
        <Pressable key={index} style={styles.categoryButtons} onPress={() => this.onSelectionChange(category)}><Text>{category}</Text></Pressable>
      ))
    );
  }

  onSelectionChange = (category) => {
    this.props.setSelection(category);
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