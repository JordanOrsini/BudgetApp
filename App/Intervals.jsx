import {useState} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

const Intervals = ({setSelection}) => {
  const [intervalData, setIntervalData] = useState([{id: 0, interval: "NONE", selected: true},
                                                    {id: 1, interval: "WEEKLY", selected: false}, 
                                                    {id: 2, interval: "BI-MONTHLY", selected: false},
                                                    {id: 3, interval: "MONTHLY", selected: false}, 
                                                    {id: 4, interval: "QUARTERLY", selected: false}, 
                                                    {id: 5, interval: "ANNUALLY", selected: false}]);

  const onSelectionChange = (item) => {
    setSelection(item.interval);

    const newDataArray = [...intervalData];
    newDataArray.map((element => {
      element.selected = (element.id === item.id) ? true : false;
    }));

    setIntervalData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <Pressable style={({pressed}) => [styles.categoryButtons, item.selected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => onSelectionChange(item)}>
        <Text>{item.interval}</Text>
      </Pressable>
    );
  }

  return (
    <View>
      <View style={styles.categoryContainer}>
        <FlatList data={intervalData} renderItem={renderItem} keyExtractor={item => item.id} numColumns={3} />      
      </View>
    </View>
  );
}

export default Intervals;