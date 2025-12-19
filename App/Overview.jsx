import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import Goals from "./Goals";
import TopCategories from "./TopCategories";
import BottomSheetContext from "./BottomSheetContext";
import AccountsInfographic from "./AccountsInfographic";
import IncomeOutflowGraphic from "./IncomeOutflowGraphic";

const Overview = () => {
  const bottomSheetContext = useContext(BottomSheetContext);
  const data = [{index: 0}, {index: 1}, {index: 2}, {index: 3}];

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Overview</Text>
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
          <Goals size={3} />
        );
      }
      case 2: {
        return (
          <IncomeOutflowGraphic />
        );
      }
      case 3: {
        return (
          <TopCategories />
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