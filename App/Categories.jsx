import {Component} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddCategory from './AddCategory';
import CategoriesContext from './CategoriesContext';

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
      lastSelectedIndex: 0,
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
    this.contextCategoryData.map((category, index) => {
      newDataArray.push({id: index, category: category.getName(), selected: (this.state.lastSelectedIndex === index) ? true : false});
    });

    this.setState({data: newDataArray});
  }

  onSelectionChange = (item) => {
    this.props.setSelection(item.category);
    this.setState({lastSelectedIndex: item.id});

    const newDataArray = [...this.state.data];
    newDataArray.map((element => {
      element.selected = (element.id === item.id) ? true : false;
    }));

    this.setState({data: newDataArray});
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
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => this.onSelectionChange(item)}>
        <Text>{item.category}</Text>
      </Pressable>
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