import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import CategoriesContext from "./CategoriesContext";
import AddCategoryModal from "./AddCategoryModal";

/* 
   Class representing the RemoveCategory modal of the application.
*/
const RemoveCategoryList = ({style}) => {
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
      <View style={styles.listContainer}>
        <Text style={[styles.listElement, styles.categoryListElement]}>{item.name}</Text>
        <Pressable style={({pressed}) => [styles.button, styles.smallButton, styles.edit, pressed && styles.pressed]} onPress={() => editItemHandler(item)}>
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
      <View style={[styles.mainBodyContainer, style]}>
        <AddCategoryModal modalVisibility={modalVisible} setVisibility={setModalVisible} categoryToEdit={categoryToEdit} clearCategoryToEdit={() => setCategoryToEdit(null)} />
        <View style={styles.listContainer}>
          <Text style={[styles.listElement, styles.listElementTitle]}>REMOVE CATEGORIES</Text>
        </View>
        <FlatList data={data} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.id} /> 
      </View>     
    </View>
  );
}

export default RemoveCategoryList;