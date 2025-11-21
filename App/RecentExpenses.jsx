import {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ExpensesContext from "./ExpensesContext";

const RecentTransactionsList = ({style}) => {
  const expensesContext = useContext(ExpensesContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [expensesContext.expenseData]);

  const fillData = () => {
    const newDataArray = [];
    expensesContext.expenseData.map((element, index) => {
      if (index < 3)
        newDataArray.push({index: index, id: element.getId(), name: element.getName(), amount: element.getAmount(), interval: element.getInterval()});
    });
   
    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.transactionContainer}>
        <Text style={[styles.recentExpenseElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.recentExpenseElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={[styles.recentExpenseElement, styles.transactionElementRight]}>{item.interval}</Text>
      </View>
    );
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.mainBodyContainerSmall, style]}>
      <View style={styles.transactionContainer}>
        <Text style={styles.recentTransactionElementTitle}>RECENT EXPENSES</Text>
      </View>
      <FlatList data={data} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.id} scrollEnabled={false} /> 
    </View>     
  );
}

export default RecentTransactionsList;