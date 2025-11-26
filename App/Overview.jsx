import {useContext, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import RecentExpenses from "./RecentExpenses";
import UserDataContext from "./UserDataContext";
import RecentTransactionsList from "./RecentTransactionsList";

const Overview  = () => {
  const userDataContext = useContext(UserDataContext);
  const [data, setData] = useState([{index: 0}, {index: 1}, {index: 2}]);
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <View style={styles.mainBodyContainerMicro}>
            <Text style={styles.headerText}>Overview</Text>
            <Text style={styles.text}>Welcome {userDataContext.userData.getName()}!</Text>
          </View> 
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
        break;
      }
    }
  }

  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index} />
    </SafeAreaView>  
  );
}

export default Overview;