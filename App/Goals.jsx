import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import BottomSheetContext from "./BottomSheetContext";

const Goals = ({style}) => {
  const bottomSheetContext = useContext(BottomSheetContext);

  const data = [{id: 0, name: "Goal", percentage: 80},
                {id: 1, name: "Goal", percentage: 30},
                {id: 2, name: "Goal", percentage: 60},
                {id: 3, name: "Goal", percentage: 100},
                {id: 4, name: "Goal", percentage: 70},
                {id: 5, name: "Goal", percentage: 90},
                {id: 6, name: "Goal", percentage: 0},
                {id: 7, name: "Goal", percentage: 10},
                {id: 8, name: "Goal", percentage: 20},
                {id: 9, name: "Goal", percentage: 40},
                {id: 10, name: "Goal", percentage: 50},
               ];

  const calcGoalOverlayWidth = (percentage) => {
    return ((percentage/100) * styles.categoryListElementEndHeader.width);
  }

  const ListHeader = () => {
    return (
      <View style={styles.backgroundTransparent}>
        <Text style={styles.containerHeaderText}>Goals</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.horizontalContainer}>
        <Text style={styles.categoryListElementStart}>{item.name} {item.id + 1}</Text>
        <View style={styles.categoryListElementEndHeader}>
          <Text style={styles.goalsText}>{item.percentage}%</Text>
          <View style={[styles.categoryListElementEndHeader, styles.goalsOverlay, {width: calcGoalOverlayWidth(item.percentage)}]}/>
        </View>
      </View>    
    );
  }

  return (
    <View style={[styles.mainBodyContainerSmall, styles.border, style]}>    
      <FlatList data={data}
                renderItem={renderItem}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} /> 
    </View>
  );
}

export default Goals;