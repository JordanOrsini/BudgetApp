import {SafeAreaView} from "react-native-safe-area-context";
import {useContext, useEffect, useState} from "react";
import {styles} from "./Style";
import {FlatList, Pressable, Text, View} from "react-native";

import ExpensesContext from "./ExpensesContext";
import AddExpense from "./AddExpense";

/* 
   Class representing the budget screen of the application.
*/
const Budget = () => {
  const expensesContext = useContext(ExpensesContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    fillData();
  }, [expensesContext.expenseData]);

  const fillData = () => {
    const newDataArray = [];
    expensesContext.expenseData.map((element, index) => {
      newDataArray.push({index: index, id: element.getId(), name: element.getName(), amount: element.getAmount(), interval: element.getInterval()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}, data) => {
    return (
      <View style={styles.transactionContainer}>
        <Text style={[styles.expenseElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.expenseElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={[styles.expenseElement, styles.transactionElementRight]}>{item.interval}</Text>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.edit, pressed && styles.pressed]} onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed && styles.pressed]} onPress={() => removeItemHandler(item)}>
          <Text>x</Text>
        </Pressable>
      </View>
    );
  }

  const removeItemHandler = (item) => {
    const modifiedExpenseArray = [...expensesContext.expenseData];
    modifiedExpenseArray.splice(item.index, 1);
    expensesContext._setExpenseData(modifiedExpenseArray);
  }

  const editItemHandler = (item) => {
    setExpenseToEdit(expensesContext.findExpenseById(item.id));
    setModalVisible(true);
  }

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Budget</Text>

      <View style={styles.mainBodyContainerSmall}>  
        <AddExpense modalVisibility={modalVisible} setVisibility={setModalVisible} expenseToEdit={expenseToEdit} clearExpenseToEdit={() => setExpenseToEdit(null)} />    
        <View style={styles.transactionContainer}>
          <Text style={[styles.expenseElement, styles.transactionElementLeft]}>Name</Text>
          <Text style={styles.expenseElement}>Amount</Text>
          <Text style={[styles.expenseElement, styles.transactionElementRight]}>Interval</Text>
        </View>
        <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.index} /> 
      </View>
      <View style={styles.mainBodyContainerSmall}></View>  
    </SafeAreaView>
  );
}

export default Budget;