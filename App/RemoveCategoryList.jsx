import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddCategoryModal from "./AddCategoryModal";
import CategoriesContext from "./CategoriesContext";
import CategoryIconManager from "./CategoryIconManager";

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
                             name: element.getName(),
                             iconPath: element.getIconPath()});
    });

    setData(newCategoryArray);
  }

  const renderItem = ({item}) => {
    return (
      (item.id > 0) &&   
      <View style={styles.listContainer}>
        <Pressable onPress={() => editItemHandler(item)}>
          {({pressed}) => (
          <View style={styles.horizontalContainer}>
            <Text style={[styles.categoryListElementStart, pressed && styles.pressed]}>{item.name}</Text>
            <View style={[styles.categoryListElementEnd, pressed && styles.pressed]}>{CategoryIconManager(item.iconPath)}</View>
          </View>
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