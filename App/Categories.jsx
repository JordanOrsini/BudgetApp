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

    this.contextCategoryData = null;

    this.state = {
      modalVisible: false,  
      data: [],
    };
  }

  componentDidMount = () => {
    this.contextCategoryData = this.context.categoryData;
    this.fillData();
  }

  componentDidUpdate = () => {
    if (this.contextCategoryData !== this.context.categoryData) {
      this.contextCategoryData = this.context.categoryData;
      this.fillData();
    }
  }

  fillData = () => {
    const newDataArray = [];
    this.contextCategoryData.map((category, index) => (
      newDataArray.push({id: index, category: category.getName()})
    ))

    this.setState({data: newDataArray});
  }

  onSelectionChange = (categoryName) => {
    this.props.setSelection(categoryName);
  }

  setModalVisibility = (visibility) => {
    this.setState({modalVisible: visibility});
  }

  renderItem = ({item}) => {
    if (item.addCategory) {
      return (
        <Pressable style={({pressed}) => [styles.categoryButtons, pressed ? styles.pressed : '']} onPress={() => this.setModalVisibility(true)}>
          <Text>+</Text>
        </Pressable>
      );
    }

    return (
      <SelectableButton style={styles.categoryButtons} selected={item.id === 0 ? true : false} onPress={() => this.onSelectionChange(item.category)}>
        <Text>{item.category}</Text>
      </SelectableButton>
    );
  }

  render () {
    return (
      <View>
        <AddCategory modalVisibility={this.state.modalVisible} setVisibility={this.setModalVisibility}/>
        <View style={styles.categoryContainer}>
          <FlatList data={[...this.state.data, {addCategory: true}]} renderItem={this.renderItem} keyExtractor={item => item.id} numColumns={3} />      
        </View>
      </View>
    );
  }
}

export default Categories;