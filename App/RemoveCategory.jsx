import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import CategoriesContext from "./CategoriesContext";
import AddCategory from "./AddCategory";

/* 
   Class representing the RemoveCategory modal of the application.
*/
const RemoveCategory = () => {
  const categoryContext = useContext(CategoriesContext);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

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

  const renderItem = ({item}) => {
    return (
      (item.id > 0) &&   
      <View style={styles.transactionContainer}>
        <Text style={styles.categoryElement}>{item.name}</Text>
        <Pressable style={({pressed}) => [styles.smallButton, styles.edit, pressed && styles.pressed]} onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
      </View>
    );
  }

  const editItemHandler = (item) => {
    setCategoryToEdit(categoryContext.findCategoryByName(item.name));
    setModalVisible(true);
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View>
      <View style={styles.mainBodyContainerSmall}>
        <AddCategory modalVisibility={modalVisible} setVisibility={setModalVisible} categoryToEdit={categoryToEdit} clearCategoryToEdit={() => setCategoryToEdit(null)} />
        <View style={styles.transactionContainer}>
          <Text style={styles.categoryElement}>REMOVE CATEGORIES</Text>
        </View>
        <FlatList data={data} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.id} /> 
      </View>     
    </View>
  );
}

export default RemoveCategory;