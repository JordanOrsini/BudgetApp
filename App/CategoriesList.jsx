import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import CategoriesContext from "./CategoriesContext";

const CategoriesList = ({setSelection, defaultSelection, setContent}) => {
  const categoriesContext = useContext(CategoriesContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [categoriesContext.categoryData, defaultSelection]);

  const fillData = () => {
    const newDataArray = [];
    categoriesContext.categoryData.map((category, index) => {
      newDataArray.push({id: index, 
                         name: category.getName(),
                         iconPath: category.getIconPath(),
                         selected: (defaultSelection === category.getName())});
    });

    setData(newDataArray);
  }

  const onSelectionChange = (item) => {
    setSelection(item.name);

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
                   onPress={() => setContent(3)}>
          <Image style={styles.iconLarge}
                 source={require("./icons/plusIcon.png")}
                 alt="+" />
        </Pressable>
      );
    }

    return (
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected && styles.selected, pressed && styles.pressed]} 
                 onPress={() => onSelectionChange(item)}>
        {getIconFromPath(item.iconPath, true /*large*/)}
        <Text numberOfLines={1} style={styles.smallText}>{item.name}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.categoryContainer}>
      <FlatList data={[...data, {addCategory: true}]}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false} />      
    </View>
  );
}

export default CategoriesList;