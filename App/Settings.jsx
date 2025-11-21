import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";
import {FlatList, Text, View} from "react-native";
import {useState} from "react";

import RemoveCategory from "./RemoveCategory";

/* 
   Class representing the settings screen of the application.
*/
const Settings = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}, {index: 3}]);
  
  const renderItem = ({item}, data) => {
    const isLastContainer = (item.index === data.length - 1);
    if (item.index === 2) {
      return (
        <RemoveCategory />
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
      <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.index} />
    </SafeAreaView> 
  );
}

export default Settings;