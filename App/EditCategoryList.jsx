import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import CategoriesContext from "./CategoriesContext";
import BottomSheetContext from "./BottomSheetContext";

const EditCategoryList = () => {
  const categoryContext = useContext(CategoriesContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [categoryContext.categoryData]);

  const editItemHandler = (item) => {
    bottomSheetContext._setContent("Category", categoryContext.findCategoryByName(item.name));
  }

  const fillData = () => {
    const newCategoryArray = [];
    categoryContext.categoryData.map((element, index) => {
      if (index !== 0) {
        newCategoryArray.push({id: index, 
                               name: element.getName(),
                               iconPath: element.getIconPath()});
      }
    });

    setData(newCategoryArray);
  }

  const ListHeader = () => {
    return (
      <View>
        <View style={styles.horizontalContainer}>
          <Text numberOfLines={1} style={styles.categoryListElementStart}>Name</Text>   
          <Text numberOfLines={1} style={styles.categoryListElementEndHeader}>Icon</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
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
    );
  }

  return (
    <View style={[styles.mainBodyContainerSmall, {alignItems: "center"}]}>
      <ListHeader />
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.id}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} /> 
    </View>     
  );
}

export default EditCategoryList;