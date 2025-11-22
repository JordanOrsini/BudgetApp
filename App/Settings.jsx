import {useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import RemoveCategoryList from "./RemoveCategoryList";

const Settings = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}, {index: 3}]);
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <View style={styles.mainBodyContainerMicro}></View> 
        );
      }
      case 1: {
        return (
          <View style={styles.mainBodyContainerMicro}></View> 
        );
      }
      case 2: {
        return (
          <RemoveCategoryList />
        );
      }
      case 3: {
        return (
          <View style={[styles.mainBodyContainerMicro, styles.lastContainer]}></View>
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
      <Text style={styles.headerText}>Settings</Text>      
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index} />
    </SafeAreaView> 
  );
}

export default Settings;