import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import ModifySalary from "./ModifySalary";
import DeleteAllData from "./DeleteAllData";
import ModifyUserName from "./ModifyUserName";
import RemoveCategoryList from "./RemoveCategoryList";

const Settings = () => {
  const data = [{index: 0}, {index: 1}, {index: 2}, {index: 3}, {index: 4}];
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <View style={styles.mainBodyContainerHeader}>
            <Text style={styles.headerText}>Settings</Text>  
          </View> 
        );
      }
      case 1: {
        return (
          <ModifyUserName />
        );
      }
      case 2: {
        return (
          <ModifySalary />
        );
      }
      case 3: {
        return (
          <RemoveCategoryList />
        );
      }
      case 4: {
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
    <SafeAreaView style={styles.pageView}>    
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                showsVerticalScrollIndicator={false} />
    </SafeAreaView> 
  );
}

export default Settings;