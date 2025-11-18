import {useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddCategory from './AddCategory';
import CategoriesContext from './CategoriesContext';

/* 
   Class representing the Category class of the application.
*/
const Categories = ({setSelection, defaultSelection, setHidden}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(defaultSelection);

  useEffect(() => {
    setHidden(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    fillData();
  }, [categoriesContext.categoryData]);

  const fillData = () => {
    const newDataArray = [];
    categoriesContext.categoryData.map((category, index) => {
      newDataArray.push({id: index, category: category.getName(), selected: (lastSelectedIndex === index) ? true : false});
    });

    setData(newDataArray);
  }

  const onSelectionChange = (item) => {
    setSelection(item.category);

    const newDataArray = [...data];
    newDataArray.map((element => {
      element.selected = (element.id === item.id) ? true : false;
    }));

    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    if (item.addCategory) {
      return (
        <Pressable style={({pressed}) => [styles.categoryButtons, pressed ? styles.pressed : '']} onPress={() => setModalVisible(true)}>
          <Text>+</Text>
        </Pressable>
      );
    }

    return (
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => onSelectionChange(item)}>
        <Text>{item.category}</Text>
      </Pressable>
    );
  }

  return (
    <View>
      <AddCategory modalVisibility={modalVisible} setVisibility={setModalVisible} setSelection={setSelection} setSelected={setLastSelectedIndex}/>
      <View style={styles.categoryContainer}>
        <FlatList data={[...data, {addCategory: true}]} renderItem={renderItem} keyExtractor={item => item.id} numColumns={3} />      
      </View>
    </View>
  );
}

export default Categories;