import {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import TransactionsContext from "./TransactionsContext";

const RecentTransactionsList = ({style}) => {
  const transactionsContext = useContext(TransactionsContext);

  const [data, setData] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    fillData();
  }, [transactionsContext.transactionData]);

  const fillData = () => {
    const newDataArray = [];
    transactionsContext.transactionData.map((element, index) => {
      if (index < 3)
        newDataArray.push({index: index,
                           id: element.getId(),
                           name: element.getName(),
                           amount: element.getAmount(), 
                           category: element.getCategory().getName(), 
                           date: new Date(element.getTransactionDate()).toLocaleDateString()});
    });
   
    setData(newDataArray);
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <Text style={[styles.listElementStart, styles.recentTransactionListElement]}>{item.name}</Text>
        <Text style={styles.recentTransactionListElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.recentTransactionListElement}>{item.category}</Text>
        <Text style={[styles.listElementEnd, styles.recentTransactionListElement]}>{item.date}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.mainBodyContainer, style]}>
      <View style={styles.listContainer}>
        <Text style={styles.listElementTitle}>RECENT TRANSACTIONS</Text>
      </View>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.id}
                scrollEnabled={false} /> 
    </View>     
  );
}

export default RecentTransactionsList;