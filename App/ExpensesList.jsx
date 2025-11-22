import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import ExpensesContext from "./ExpensesContext";

const ExpensesList = ({style}) => {
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
      newDataArray.push({index: index,
                         id: element.getId(), 
                         name: element.getName(), 
                         amount: element.getAmount(),
                         interval: element.getInterval()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <Text style={[styles.listElementStart, styles.expenseListElement]}>{item.name}</Text>
        <Text style={styles.expenseListElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={[styles.listElementEnd, styles.expenseListElement]}>{item.interval}</Text>
        <Pressable style={({pressed}) => [styles.smallButton, styles.edit, pressed && styles.pressed]}
                   onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
      </View>
    );
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.mainBodyContainer, style]}>  
      <AddExpenseModal modalVisibility={modalVisible}
                       setVisibility={setModalVisible}
                       expenseToEdit={expenseToEdit}
                       clearExpenseToEdit={() => setExpenseToEdit(null)} />    
      <View style={styles.listContainer}>
        <Text style={[styles.listElementStart, styles.expenseListElement]}>Name</Text>
        <Text style={styles.expenseListElement}>Amount</Text>
        <Text style={[styles.listElementEnd, styles.expenseListTitleEnd]}>Interval</Text>
      </View>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index} /> 
    </View>
  );
}

export default ExpensesList;