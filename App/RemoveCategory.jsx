import {useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import CategoriesContext from './CategoriesContext';
import AddCategory from './AddCategory';

/* 
   Class representing the RemoveCategory modal of the application.
*/
const RemoveCategory = (props) => {
  const categoryContext = useContext(CategoriesContext);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryNameToEdit, setCategoryNameToEdit] = useState("");

  useEffect(() => {
    fillData();
  }, [categoryContext.categoryData]);

  const fillData = () => {
    const newCategoryArray = [];
    categoryContext.categoryData.map((element, index) => {
      newCategoryArray.push({id: index, name: element.getName()});
    });

    setData(newCategoryArray);
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (item.id === data.length - 1);
    return (
      (item.id > 0) &&   
      <View style={[styles.transactionContainer, isLastItem ? styles.lastItem : '']}>
        <Text style={styles.categoryElement}>{item.name}</Text>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.edit, pressed ? styles.pressed : '']} onPress={() => editItemHandler(item)}>
          <Text>E</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed ? styles.pressed : '']} onPress={() => removeItemHandler(item)}>
          <Text>X</Text>
        </Pressable>
      </View>
    );
  }

  const editItemHandler = (item) => {
    setCategoryNameToEdit(item.name);
    setModalVisible(true);
  }

  // Function that handles the onPress event of a category element.
  // The function takes an index and will remove the corresponding category object from the category array.
  const removeItemHandler = (item) => {
    categoryContext.categoryData.splice(item.id, 1);
    categoryContext._setCategoryData([...categoryContext.categoryData]);
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={styles.mainBodyContainer}>
      <AddCategory modalVisibility={modalVisible} setVisibility={setModalVisible} editMode={true} categoryName={categoryNameToEdit} />
      <View style={styles.transactionContainer}>
        <Text style={styles.categoryElement}>REMOVE CATEGORIES</Text>
      </View>
      <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.id} /> 
    </View>     
  );
}

export default RemoveCategory;