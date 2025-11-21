import {FlatList, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {styles} from "./Style";

/* 
   Class representing the overview screen of the application.
*/
const Overview  = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}]);
  
  const renderItem = ({item}, data) => {
    const isLastContainer = (item.index === data.length - 1);
    if (item.index === 0) {
      return (
        <View style={styles.mainBodyContainerMicro}></View> 
      );
    }

    return (
      <View style={[styles.mainBodyContainerSmall, isLastContainer && styles.lastContainer]}></View> 
    );
  }

  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Overview</Text>
      <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.index} />
    </SafeAreaView>  
  );
}

export default Overview;