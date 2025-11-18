import {SafeAreaView} from 'react-native-safe-area-context';
import {useContext, useEffect, useState} from 'react';
import {styles} from "./Style";
import {FlatList, Text, View} from "react-native";

import ExpensesContext from './ExpensesContext';

/* 
   Class representing the budget screen of the application.
*/
const Budget = () => {
  const expensesContext = useContext(ExpensesContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [expensesContext.expenseData]);

  const fillData = () => {
    const newDataArray = [];
    expensesContext.expenseData.map((element, index) => {
      newDataArray.push({index: index, id: element.getId(), name: element.getName(), amount: element.getAmount(), interval: element.getInterval(), date: element.getStartDate()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (item.index === data.length - 1);
    return (
      <View style={[styles.transactionContainer, isLastItem ? styles.lastItem : '']}>
        <Text style={[styles.expenseElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.expenseElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.expenseElement}>{item.interval}</Text>
        <Text style={[styles.expenseElement, styles.transactionElementRight]}>{item.date}</Text>
      </View>
    );
  }

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Budget</Text>

      <View style={styles.mainBodyContainer}>      
        <View style={styles.transactionContainer}>
          <Text style={[styles.expenseElement, styles.transactionElementLeft]}>Name</Text>
          <Text style={styles.expenseElement}>Amount</Text>
          <Text style={styles.expenseElement}>Interval</Text>
          <Text style={[styles.expenseElement, styles.transactionElementRight]}>Start date</Text>
        </View>
        <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.index} /> 
      </View>  
    </SafeAreaView>
  );
}

export default Budget;