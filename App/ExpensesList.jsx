import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import ExpensesContext from "./ExpensesContext";
import BottomSheetContext from "./BottomSheetContext";

const ExpensesList = () => {
  const expensesContext = useContext(ExpensesContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  const [data, setData] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    fillData();
  }, [expensesContext.expenseData]);

  const editItemHandler = (item) => {
    bottomSheetContext._setContent("Expense", expensesContext.findExpenseById(item.id));
  }

  const fillData = () => {
    const newDataArray = [];
    expensesContext.expenseData.map((element, index) => {
      newDataArray.push({index: index,
                         id: element.getId(), 
                         name: element.getName(), 
                         amount: element.getAmount(),
                         interval: element.getInterval()});
    });

    setData(newDataArray);
  }

  const ListHeader = () => {
    return (
      <View style={styles.horizontalContainer}>
        <Text numberOfLines={1} style={styles.listElementStart}>Name</Text>
        <Text numberOfLines={1} style={styles.listElement}>Amount</Text>    
        <Text numberOfLines={1} style={styles.expenseListElementEnd}>Frequency</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      <Pressable onPress={() => editItemHandler(item)}>
        {({pressed}) => (
        <View style={styles.horizontalContainer}>
          <Text numberOfLines={1} style={[styles.listElementStart, pressed && styles.pressed]}>{item.name}</Text>
          <Text numberOfLines={1} style={[styles.listElement, pressed && styles.pressed]}>{myNumberFormatter.format(item.amount)}</Text>
          <Text numberOfLines={1} style={[styles.expenseListElementEnd, pressed && styles.pressed]}>{item.interval}</Text>
        </View>
        )}
      </Pressable>
    );
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[(data.length === 0 || data.length > 4) ? styles.mainBodyContainerSmall : styles.mainBodyContainer, {alignItems: "center"}]}> 
      <ListHeader />   
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} /> 
    </View>
  );
}

export default ExpensesList;