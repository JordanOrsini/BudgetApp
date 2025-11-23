import {useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import ExpensesList from "./ExpensesList";

const Budget = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}]);
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <View style={styles.mainBodyContainerMicro}>
            <Text style={styles.headerText}>Budget</Text>
          </View>
        );
      }
      case 1: {
        return (
          <ExpensesList style={styles.lastContainer} />
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
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                scrollEnabled={false} />
    </SafeAreaView>
  );
}

export default Budget;