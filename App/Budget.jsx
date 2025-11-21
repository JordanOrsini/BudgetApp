import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {styles} from "./Style";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";

import Expenses from "./Expenses";

/* 
   Class representing the budget screen of the application.
*/
const Budget = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}]);
  
  const renderItem = ({item}, data) => {
    const isLastContainer = (item.index === data.length - 1);
    if (item.index === 0) {
      return (
        <Expenses />
      );
    }

    return (
      <View style={[styles.mainBodyContainerSmall, isLastContainer && styles.lastContainer]}></View> 
    );
  }

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Budget</Text>
      <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={(item) => item.index} />
    </SafeAreaView>
  );
}

export default Budget;