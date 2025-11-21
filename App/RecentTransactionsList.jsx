import {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import TransactionsContext from "./TransactionsContext";

const RecentTransactionsList = ({style}) => {
  const transactionsContext = useContext(TransactionsContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [transactionsContext.transactionData]);

  const fillData = () => {
    const newDataArray = [];
    transactionsContext.transactionData.map((element, index) => {
      if (index < 3)
        newDataArray.push({index: index, id: element.getId(), name: element.getName(), amount: element.getAmount(), category: element.getCategory().getName(), date: new Date(element.getTransactionDate()).toLocaleDateString()});
    });
   
    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <Text style={[styles.listElement, styles.recentTransactionListElement, styles.listElementStart]}>{item.name}</Text>
        <Text style={[styles.listElement, styles.recentTransactionListElement]}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={[styles.listElement, styles.recentTransactionListElement]}>{item.category}</Text>
        <Text style={[styles.listElement, styles.recentTransactionListElement, styles.listElementEnd]}>{item.date}</Text>
      </View>
    );
  }

  // Function that returns the contents of the AddTransaction modal.
  return (
    <View style={[styles.mainBodyContainer, style]}>
      <View style={styles.listContainer}>
        <Text style={[styles.listElement, styles.listElementTitle]}>RECENT TRANSACTIONS</Text>
      </View>
      <FlatList data={data} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.id} scrollEnabled={false} /> 
    </View>     
  );
}

export default RecentTransactionsList;