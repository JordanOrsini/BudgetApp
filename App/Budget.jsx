import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import ExpensesList from "./ExpensesList";
import UserDataContext from "./UserDataContext";

const Budget = () => {
  const userDataContext = useContext(UserDataContext);

  const data = [{index: 0}];
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
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]} />
    </SafeAreaView>
  );
}

export default Budget;