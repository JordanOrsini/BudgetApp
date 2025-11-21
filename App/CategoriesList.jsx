import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddCategory from "./AddCategory";
import CategoriesContext from "./CategoriesContext";

/* 
   Class representing the Category class of the application.
*/
const CategoriesList = ({setSelection, defaultSelection, setDefaultSelection, setHidden}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setHidden(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    fillData();
  }, [categoriesContext.categoryData, defaultSelection]);

  const fillData = () => {
    const newDataArray = [];
    categoriesContext.categoryData.map((category, index) => {
      newDataArray.push({id: index, category: category.getName(), selected: (defaultSelection === index)});
    });

    setData(newDataArray);
  }

  const onSelectionChange = (item) => {
    setSelection(item.category);
    setDefaultSelection(item.id);

    const newDataArray = [...data];
    newDataArray.map((element => {
      element.selected = (element.id === item.id);
    }));

    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    if (item.addCategory) {
      return (
        <Pressable style={({pressed}) => [styles.categoryButtons, pressed && styles.pressed]} onPress={() => setModalVisible(true)}>
          <Text>+</Text>
        </Pressable>
      );
    }

    return (
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected && styles.selected, pressed && styles.pressed]} onPress={() => onSelectionChange(item)}>
        <Text>{item.category}</Text>
      </Pressable>
    );
  }

  return (
    <View>
      <AddCategory modalVisibility={modalVisible} setVisibility={setModalVisible} setSelectionInput={setSelection} setSelectedButton={setDefaultSelection}/>
      <View style={styles.categoryContainer}>
        <FlatList data={[...data, {addCategory: true}]} renderItem={renderItem} keyExtractor={(item) => item.id} numColumns={3} />      
      </View>
    </View>
  );
}

export default CategoriesList;