import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import Goals from "./Goals";
import Accounts from "./Accounts";
import ExpensesList from "./ExpensesList";
import UserDataContext from "./UserDataContext";
import BottomSheetContext from "./BottomSheetContext";

const Budget = () => {
  const userDataContext = useContext(UserDataContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  const data = [{index: 0}, {index: 1}, {index: 2}];
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Budget</Text>
        <Text style={styles.subHeaderText}>Salary: {myNumberFormatter.format(userDataContext.userData.getSalary())}</Text>
      </View>
    );
  }
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <ExpensesList />
        );
      }
      case 1: {
        return (
          <Accounts />
        );
      }
      case 2: {
        return (
          <Goals style={styles.lastContainer} />
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
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} />
    </SafeAreaView>
  );
}

export default Budget;