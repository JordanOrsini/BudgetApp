import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {styles} from "./Style";

import RecentExpenses from "./RecentExpenses";
import RecentTransactionsList from "./RecentTransactionsList";

/* 
   Class representing the overview screen of the application.
*/
const Overview  = () => {
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}]);
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <View style={styles.mainBodyContainerMicro}></View> 
        );
      }
      case 1: {
        return (
          <RecentExpenses />
        );
      }
      case 2: {
        return (
          <RecentTransactionsList style={styles.lastContainer} />
        );
      }
      default: {
        return (
          <View style={styles.mainBodyContainerSmall}></View> 
        );
      }
    }
  }

  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Overview</Text>
      <FlatList data={data} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.index} />
    </SafeAreaView>  
  );
}

export default Overview;