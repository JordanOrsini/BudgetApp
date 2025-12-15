import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import EditUser from "./EditUser";
import DeleteAllData from "./DeleteAllData";
import EditCategoryList from "./EditCategoryList";
import BottomSheetContext from "./BottomSheetContext";

const Settings = () => {
  const bottomSheetContext = useContext(BottomSheetContext);
  const data = [{index: 0}, {index: 1}, {index: 2}];

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Settings</Text>  
      </View> 
    );
  }
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <EditUser />
        );
      }
      case 1: {
        return (
          <EditCategoryList />
        );
      }
      case 2: {
        return (
          <DeleteAllData style={styles.lastContainer} />
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the settings screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["top", "left", "right"]}>    
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} />
    </SafeAreaView> 
  );
}

export default Settings;