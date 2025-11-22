import {useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import ExpensesList from "./ExpensesList";

const Budget = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}]);
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <ExpensesList />
        );
      }
      case 1: {
        return (
          <View style={styles.mainBodyContainer}></View> 
        );
      }
      case 2: {
        return (
          <View style={[styles.mainBodyContainer, styles.lastContainer]}></View>
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Budget</Text>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index} />
    </SafeAreaView>
  );
}

export default Budget;