import {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ExpensesContext from "./ExpensesContext";

const RecentTransactionsList = ({style}) => {
  const expensesContext = useContext(ExpensesContext);

  const [data, setData] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    fillData();
  }, [expensesContext.expenseData]);

  const fillData = () => {
    const newDataArray = [];
    expensesContext.expenseData.map((element, index) => {
      if (index < 3)
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
        <Text style={[styles.listElementStart, styles.recentExpenseListElement]}>{item.name}</Text>
        <Text style={styles.recentExpenseListElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={[styles.listElementEnd, styles.recentExpenseListElement]}>{item.interval}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.mainBodyContainer, style]}>
      <View style={styles.listContainer}>
        <Text style={styles.listElementTitle}>RECENT EXPENSES</Text>
      </View>
      <FlatList data={data}
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.id} 
                scrollEnabled={false} /> 
    </View>     
  );
}

export default RecentTransactionsList;