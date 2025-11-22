import {useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

const IntervalsList = ({setSelection, defaultSelection}) => {
  const [intervalData, setIntervalData] = useState([{id: 0, interval: "NONE", selected: false},
                                                    {id: 1, interval: "WEEKLY", selected: false}, 
                                                    {id: 2, interval: "BI-MONTHLY", selected: false},
                                                    {id: 3, interval: "MONTHLY", selected: false}, 
                                                    {id: 4, interval: "QUARTERLY", selected: false}, 
                                                    {id: 5, interval: "ANNUALLY", selected: false}]);

  useEffect(() => {
    if (defaultSelection) {
      const newIntervalData = [...intervalData];
      newIntervalData.map((element) => {
        element.selected = (element.interval === defaultSelection);
      })
    
    setIntervalData(newIntervalData);
    }
  }, [defaultSelection]);
  

  const onSelectionChange = (item) => {
    setSelection(item.interval);

    const newDataArray = [...intervalData];
    newDataArray.map((element => {
      element.selected = (element.id === item.id);
    }));

    setIntervalData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <View>
        <Pressable style={({pressed}) => [styles.button, item.selected && styles.selected, pressed && styles.pressed]} 
                   onPress={() => onSelectionChange(item)}>
          <Text>{item.interval}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.intervalContainer}>
        <FlatList data={intervalData} 
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id} 
                  numColumns={3} />      
      </View>
    </View>
  );
}

export default IntervalsList;