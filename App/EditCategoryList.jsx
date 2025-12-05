import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import AddCategoryModal from "./AddCategoryModal";
import CategoriesContext from "./CategoriesContext";

const EditCategoryList = ({style}) => {
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

  const ListHeader = () => {
    return (
      <View>
        <Text style={styles.subHeaderText}>Edit category</Text>
        <View style={styles.listContainer}>
          <Text style={styles.categoryListElementStart}>Name</Text>   
          <Text style={styles.categoryListElementEndHeader}>Icon</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      (item.id > 0) &&   
      <View style={styles.listContainer}>
        <Pressable onPress={() => editItemHandler(item)}>
          {({pressed}) => (
          <View style={styles.horizontalContainer}>
            <Text numberOfLines={1} style={[styles.categoryListElementStart, pressed && styles.pressed]}>{item.name}</Text>
            <View style={[styles.categoryListElementEnd, pressed && styles.pressed]}>
              {getIconFromPath(item.iconPath)}
            </View>
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
      <ListHeader />
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.id}
                ListEmptyComponent={ListEmpty}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContentContainer} /> 
    </View>     
  );
}

export default EditCategoryList;