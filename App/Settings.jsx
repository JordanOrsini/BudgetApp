import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {useState} from "react";

import RemoveCategoryList from "./RemoveCategoryList";

/* 
   Class representing the settings screen of the application.
*/
const Settings = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}, {index: 3}]);
  
  const renderItem = ({item}, data) => {
    const isLastContainer = (item.index === data.length - 1);
    if (item.index === 2) {
      return (
        <RemoveCategoryList />
      );
    }

    return (
      <View style={[styles.mainBodyContainerMicro, isLastContainer && styles.lastContainer]}></View>
    );
  }

  // Function that returns the contents of the settings screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Settings</Text>      
      <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={(item) => item.index} />
    </SafeAreaView> 
  );
}

export default Settings;