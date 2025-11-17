import {useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import TransactionsContext from './TransactionsContext';

/* 
   Class representing the transactions screen of the application.
*/
const Transactions = (props) => {
  const transactionContext = useContext(TransactionsContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);

  useEffect(() => {
    fillData();
  }, [transactionContext.userData]);

  const fillData = () => {
    const newDataArray = [];
    transactionContext.userData.map((element, index) => {
      newDataArray.push({id: index, name: element.getName(), amount: element.getAmount(), category: element.getCategory().getName(), date: element.getTransactionDate()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (item.id === data.length - 1);
    return (
      <View style={[styles.transactionContainer, isLastItem ? styles.lastItem : '']}>
        <Text style={[styles.transactionElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.transactionElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.transactionElement}>{item.category}</Text>
        <Text style={[styles.transactionElement, styles.transactionElementRight]}>{item.date}</Text>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed ? styles.pressed : '']} onPress={() => removeItemHandler(item.id)}>
          <Text>X</Text>
        </Pressable>
      </View>
    );
  }

  // Function that handles the onPress event of a transaction element.
  // The function takes an index and will remove the corresponding transaction object from the transactions array.
  const removeItemHandler = (index) => {
    transactionContext.userData.splice(index, 1);
    transactionContext._setUserData([...transactionContext.userData]);
  }

  // Function that returns the contents of the transactions screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Transactions</Text>
      <Text>Total amount spent: {myNumberFormatter.format(transactionContext.totalAmount)}</Text>   

      <View style={styles.mainBodyContainer}>
        <View style={styles.transactionContainer}>
          <Text style={[styles.transactionElement, styles.transactionElementLeft]}>Name</Text>
          <Text style={styles.transactionElement}>Amount</Text>
          <Text style={styles.transactionElement}>Category</Text>
          <Text style={[styles.transactionElement, styles.transactionElementRight]}>Date</Text>
        </View>
        <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.id} /> 
      </View>      
    </SafeAreaView> 
    );
}

export default Transactions;