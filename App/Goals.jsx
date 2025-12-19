import {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import BottomSheetContext from "./BottomSheetContext";

const Goals = ({size}) => {
  const bottomSheetContext = useContext(BottomSheetContext);

  const [data, setData] = useState([{id: 0, name: "Goal 1", percentage: 80},
                                    {id: 1, name: "Goal 2", percentage: 30},
                                    {id: 2, name: "Goal 3", percentage: 60},
                                    {id: 3, name: "Goal 4", percentage: 100},
                                    {id: 4, name: "Goal 5", percentage: 70},
                                    {id: 5, name: "Goal 6", percentage: 90},
                                    {id: 6, name: "Goal 7", percentage: 0},
                                    {id: 7, name: "Goal 8", percentage: 10},
                                    {id: 8, name: "Goal 9", percentage: 20},
                                    {id: 9, name: "Goal 10", percentage: 40},
                                    {id: 10, name: "Goal 11", percentage: 50},
                                   ]);

  useEffect(() => {
    if (size)
      calcTopGoals();
  }, []);

  const calcGoalOverlayWidth = (percentage) => {
    return ((percentage/100) * styles.categoryListElementEndHeader.width);
  }

  const calcTopGoals = () => {
    const topGoals = [null, null, null];
    
    data.map((goal) => {
      if (topGoals[0] === null ||
          goal.percentage > topGoals[0].percentage) {
        topGoals[2] = topGoals[1];
        topGoals[1] = topGoals[0];
        topGoals[0] = goal;

      }
      else if (topGoals[1] === null ||
               goal.percentage > topGoals[1].percentage) {
        topGoals[2] = topGoals[1];
        topGoals[1] = goal;
      }
      else if (topGoals[2] === null ||
               goal.percentage > topGoals[2].percentage)
        topGoals[2] = goal;
    });
  
    fillData(topGoals);
  }

  const fillData = (topGoals) => {
    const newDataArray = [];

    topGoals.map((goal, index) => {
      if (goal !== null && 
          goal.percentage !== 0) {
        newDataArray.push({id: index, 
                           name: goal.name,
                           percentage: goal.percentage});
      }
    });

    setData(newDataArray);
  }

  const ListHeader = () => {
    if (size) {
      return (
        <Text style={styles.containerHeaderText}>Top goals</Text>
      );
    }
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.horizontalContainer}>
        <Text style={styles.goalListElementStart}>{item.name}</Text>
        <View style={styles.goalListElementEnd}>
          <Text style={styles.goalsText}>{item.percentage}%</Text>
          <View style={[styles.goalListElementEnd, styles.goalsOverlay, {width: calcGoalOverlayWidth(item.percentage)}]}/>
        </View>
      </View>    
    );
  }

  return (
    <View style={[size ? styles.mainBodyContainer : styles.mainBodyContainerSmall, styles.lastContainer, {alignItems: "center"}]}>
      <FlatList data={data}
                renderItem={renderItem}
                ListEmptyComponent={ListEmpty}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                contentContainerStyle={styles.flatListContentContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!size && 
                               !bottomSheetContext.bottomSheetVisible} /> 
    </View>
  );
}

export default Goals;