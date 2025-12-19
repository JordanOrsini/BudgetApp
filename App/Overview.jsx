import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import Goals from "./Goals";
import TopCategories from "./TopCategories";
import UserDataContext from "./UserDataContext";
import BottomSheetContext from "./BottomSheetContext";
import AccountsInfographic from "./AccountsInfographic";

const Overview = () => {
  const userDataContext = useContext(UserDataContext);
  const bottomSheetContext = useContext(BottomSheetContext);
  const data = [{index: 0}, {index: 1}, {index: 2}];

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
          <AccountsInfographic />
        );
      }
      case 1: {
        return (
          <TopCategories />
        );
      }
      case 2: {
        return (
          <Goals size={3} />
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