import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import ExpensesList from "./ExpensesList";
import UserDataContext from "./UserDataContext";
import TransactionsList from "./TransactionsList";

const Overview  = () => {
  const userDataContext = useContext(UserDataContext);
  const data = [{index: 0}, {index: 1}, {index: 2}];
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <View style={styles.mainBodyContainerHeader}>
            <Text style={styles.headerText}>Overview</Text>
            <Text style={styles.subHeaderText}>Welcome {userDataContext.userData.getName()}! 😊</Text>
          </View> 
        );
      }
      case 1: {
        return (
          <ExpensesList size={5} style={styles.mainBodyContainerMedium} />
        );
      }
      case 2: {
        return (
          <TransactionsList size={5} style={[styles.mainBodyContainerMedium, styles.lastContainer]} />
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                showsVerticalScrollIndicator={false} />
    </SafeAreaView>  
  );
}

export default Overview;