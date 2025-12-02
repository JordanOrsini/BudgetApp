import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddCategoryModal from "./AddCategoryModal";
import CategoriesContext from "./CategoriesContext";

const CategoriesList = ({setSelection, defaultSelection, setHidden}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setHidden(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    fillData();
  }, [categoriesContext.categoryData, defaultSelection]);

  const fillData = () => {
    const newDataArray = [];
    categoriesContext.categoryData.map((category, index) => {
      newDataArray.push({id: index, 
                         category: category.getName(),
                         selected: (defaultSelection === category.getName())});
    });

    setData(newDataArray);
  }

  const onSelectionChange = (item) => {
    setSelection(item.category);

    const newDataArray = [...data];
    newDataArray.map((element => {
      element.selected = (element.id === item.id);
    }));

    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    if (item.addCategory) {
      return (
        <Pressable style={({pressed}) => [styles.categoryButtons, pressed && styles.pressed]} 
                   onPress={() => setModalVisible(true)}>
          <Image style={styles.icon}
                 source={require("./icons/plusIcon.png")}
                 alt="+" />
        </Pressable>
      );
    }

    return (
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected && styles.selected, pressed && styles.pressed]} 
                 onPress={() => onSelectionChange(item)}>
        <Text>{item.category}</Text>
      </Pressable>
    );
  }

  return (
    <View>
      <AddCategoryModal modalVisibility={modalVisible} 
                        setVisibility={setModalVisible} 
                        setSelectionInput={setSelection}/>
      <View style={styles.categoryContainer}>
        <FlatList data={[...data, {addCategory: true}]}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false} />      
      </View>
    </View>
  );
}

export default CategoriesList;