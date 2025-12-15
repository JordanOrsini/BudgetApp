import {useContext} from "react";
import {Image, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import ExpensesList from "./ExpensesList";
import UserDataContext from "./UserDataContext";
import TransactionsList from "./TransactionsList";
import BottomSheetContext from "./BottomSheetContext";
import TopCategories from "./TopCategories";

const Overview = () => {
  const userDataContext = useContext(UserDataContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  const data = [{index: 0}, {index: 1}, {index: 2}, {index: 3}];

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Overview</Text>
        <Text style={styles.subHeaderText}>Welcome {userDataContext.userData.getName()}! 😊</Text>
      </View>
    );
  }
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <Image style={styles.iconGiant}
                 source={require("./icons/overviewGraphic.png")}
                 alt="Overview graphic" />
        );
      }
      case 1: {
        return (
          <TopCategories showTotal={false} />
        );
      }
      case 2: {
        return (
          <ExpensesList size={3} />
        );
      }
      case 3: {
        return (
          <TransactionsList style={styles.lastContainer}
                            size={3} />
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
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

export default Overview;