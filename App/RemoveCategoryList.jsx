import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddCategoryModal from "./AddCategoryModal";
import CategoriesContext from "./CategoriesContext";

const RemoveCategoryList = ({style}) => {
  const categoryContext = useContext(CategoriesContext);

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    fillData();
  }, [categoryContext.categoryData]);

  const editItemHandler = (item) => {
    setCategoryToEdit(categoryContext.findCategoryByName(item.name));
    setModalVisible(true);
  }

  const fillData = () => {
    const newCategoryArray = [];
    categoryContext.categoryData.map((element, index) => {
      newCategoryArray.push({id: index, 
                             name: element.getName()});
    });

    setData(newCategoryArray);
  }

  const renderItem = ({item}) => {
    return (
      (item.id > 0) &&   
      <View style={styles.listContainer}>
        <Pressable onPress={() => editItemHandler(item)}>
          {({pressed}) => (
          <Text style={[styles.categoryListElement, pressed && styles.pressed]}>{item.name}</Text>
          )}
        </Pressable>
      </View>
    );
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.mainBodyContainerMedium, style]}>
      <AddCategoryModal modalVisibility={modalVisible} 
                        setVisibility={setModalVisible}
                        categoryToEdit={categoryToEdit} 
                        clearCategoryToEdit={() => setCategoryToEdit(null)} />
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false} /> 
    </View>     
  );
}

export default RemoveCategoryList;