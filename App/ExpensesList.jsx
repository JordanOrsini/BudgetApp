import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import ExpensesContext from "./ExpensesContext";
import BottomSheetContext from "./BottomSheetContext";

const ExpensesList = ({style, size}) => {
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
      if (!size || (size && index < size))
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
      <View>
        {size &&
        <Text style={styles.subHeaderText}>Recent expenses</Text>
        }
        {!size &&
        <Text style={styles.subHeaderText}>Expenses</Text>
        }
        <View style={styles.listContainer}>
          <Text numberOfLines={1} style={styles.listElementStart}>Name</Text>
          <Text numberOfLines={1} style={styles.listElement}>Amount</Text>    
          <Text numberOfLines={1} style={styles.listElementIconHeader}>Rec</Text>
          <Text numberOfLines={1} style={styles.listElementEnd}>Frequency</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (!size && (item.index === data.length - 1));
    return (
      <View style={[styles.listContainer, isLastItem && styles.lastItem]}>
        <Pressable onPress={() => editItemHandler(item)}>
          {({pressed}) => (
          <View style={styles.horizontalContainer}>
            <Text numberOfLines={1} style={[styles.listElementStart, pressed && styles.pressed]}>{item.name}</Text>
            <Text numberOfLines={1} style={[styles.listElement, pressed && styles.pressed]}>{myNumberFormatter.format(item.amount)}</Text>
            <View style={[styles.listElementIcon, pressed && styles.pressed]}>
              <Image style={styles.icon}
                     source={require("./icons/recurringIcon.png")}
                     alt="Recurring" />
            </View>
            <Text numberOfLines={1} style={[styles.listElementEnd, pressed && styles.pressed]}>{item.interval}</Text>
          </View>
          )}
        </Pressable>
      </View>
    );
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.mainBodyContainerLarge, style]}> 
      <ListHeader />    
      <FlatList data={data} 
                renderItem={(item) => renderItem(item, data)} 
                keyExtractor={(item) => item.index}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible && size === undefined}
                ListEmptyComponent={ListEmpty}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContentContainer} /> 
    </View>
  );
}

export default ExpensesList;