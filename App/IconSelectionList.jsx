import {useEffect, useState} from "react";
import {Pressable, View} from "react-native";
import {getAllIconPaths, getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

const IconSelectionList = ({setSelection, defaultSelection}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [defaultSelection]);

  const fillData = () => {
    const iconPaths = getAllIconPaths();
    const newDataArray = [];
    iconPaths.map((element, index) => {
      newDataArray.push({id: index, 
                         iconPath: element,
                         selected: (defaultSelection === element)});
    });

    setData(newDataArray);
  }

  const onSelectionChange = (item) => {
    setSelection(item.iconPath);

    const newDataArray = [...data];
    newDataArray.map((element => {
      element.selected = (element.id === item.id);
    }));

    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected && styles.selected, pressed && styles.pressed]} 
                 onPress={() => onSelectionChange(item)}>
        {getIconFromPath(item.iconPath, true /*large*/)}
      </Pressable>
    );
  }

  return (
    <View>
      <View style={styles.categoryContainer}>
        <FlatList data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false} />      
      </View>
    </View>
  );
}

export default IconSelectionList;