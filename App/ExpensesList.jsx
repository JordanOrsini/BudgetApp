import {useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import AddExpenseModal from "./AddExpenseModal";
import ExpensesContext from "./ExpensesContext";

const ExpensesList = ({style, size}) => {
  const expensesContext = useContext(ExpensesContext);

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    fillData();
  }, [expensesContext.expenseData]);

  const editItemHandler = (item) => {
    setExpenseToEdit(expensesContext.findExpenseById(item.id));
    setModalVisible(true);
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
          <Text style={styles.listElementStart}>Name</Text>
          <Text style={styles.listElement}>Amount</Text>    
          <Text style={styles.listElementIconHeader}>Rec</Text>
          <Text style={styles.listElementEnd}>Frequency</Text>
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
      <AddExpenseModal modalVisibility={modalVisible}
                       setVisibility={setModalVisible}
                       expenseToEdit={expenseToEdit}
                       clearExpenseToEdit={() => setExpenseToEdit(null)} />
      <ListHeader />    
      <FlatList data={data} 
                renderItem={(item) => renderItem(item, data)} 
                keyExtractor={(item) => item.index}
                scrollEnabled={size === undefined}
                ListEmptyComponent={ListEmpty}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContentContainer} /> 
    </View>
  );
}

export default ExpensesList;