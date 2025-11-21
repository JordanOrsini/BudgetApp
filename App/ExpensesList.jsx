import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ExpensesContext from "./ExpensesContext";
import AddExpense from "./AddExpense";

const ExpensesList = () => {
  const [data, setData] = useState([]);
  const expensesContext = useContext(ExpensesContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

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

  const renderItem = ({item}) => {
    return (
      <View style={styles.transactionContainer}>
        <Text style={[styles.expenseElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.expenseElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={[styles.expenseElement, styles.transactionElementRight]}>{item.interval}</Text>
        <Pressable style={({pressed}) => [styles.smallButton, styles.edit, pressed && styles.pressed]} onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
      </View>
    );
  }

  const editItemHandler = (item) => {
    setExpenseToEdit(expensesContext.findExpenseById(item.id));
    setModalVisible(true);
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={styles.mainBodyContainerSmall}>  
      <AddExpense modalVisibility={modalVisible} setVisibility={setModalVisible} expenseToEdit={expenseToEdit} clearExpenseToEdit={() => setExpenseToEdit(null)} />    
      <View style={styles.transactionContainer}>
        <Text style={[styles.expenseElement, styles.transactionElementLeft]}>Name</Text>
        <Text style={styles.expenseElement}>Amount</Text>
        <Text style={[styles.expenseElement, styles.transactionElementRight]}>Interval</Text>
      </View>
      <FlatList data={data} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.index} /> 
    </View>
  );
}

export default ExpensesList;