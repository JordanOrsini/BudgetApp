import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import CategoriesContext from "./CategoriesContext";
import BottomSheetContext from "./BottomSheetContext";

const EditCategoryList = ({style}) => {
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
      newCategoryArray.push({id: index, 
                             name: element.getName(),
                             iconPath: element.getIconPath()});
    });

    setData(newCategoryArray);
  }

  const ListHeader = () => {
    return (
      <View style={styles.backgroundTransparent}>
        <Text style={styles.containerHeaderText}>Edit category</Text>
        <View style={{alignItems: "center"}}>
          <View style={styles.horizontalContainer}>
            <Text numberOfLines={1} style={styles.categoryListElementStart}>Name</Text>   
            <Text numberOfLines={1} style={styles.categoryListElementEndHeader}>Icon</Text>
          </View>
        </View>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      (item.id > 0) &&  
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

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.mainBodyContainer, styles.border, style]}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.id}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} /> 
    </View>     
  );
}

export default EditCategoryList;