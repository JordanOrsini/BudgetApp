import {useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import AddTransaction from './AddTransaction';
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the transactions screen of the application.
*/
const Transactions = () => {
  const transactionContext = useContext(TransactionsContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  useEffect(() => {
    fillData();
  }, [transactionContext.transactionData]);

  const fillData = () => {
    const newDataArray = [];
    transactionContext.transactionData.map((element, index) => {
      newDataArray.push({index: index, id: element.getId(), name: element.getName(), amount: element.getAmount(), category: element.getCategory().getName(), date: element.getTransactionDate()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (item.index === data.length - 1);
    return (
      <View style={[styles.transactionContainer, isLastItem ? styles.lastItem : '']}>
        <Text style={[styles.transactionElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.transactionElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.transactionElement}>{item.category}</Text>
        <Text style={[styles.transactionElement, styles.transactionElementRight]}>{item.date}</Text>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.edit, pressed ? styles.pressed : '']} onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed ? styles.pressed : '']} onPress={() => removeItemHandler(item)}>
          <Text>x</Text>
        </Pressable>
      </View>
    );
  }

  // Function that handles the onPress event of a transaction element.
  // The function takes an index and will remove the corresponding transaction object from the transactions array.
  const removeItemHandler = (item) => {
    const modifiedTransactionArray = [...transactionContext.transactionData];
    modifiedTransactionArray.splice(item.index, 1);
    transactionContext._setTransactionData(modifiedTransactionArray);
  }

  const editItemHandler = (item) => {
    setTransactionToEdit(transactionContext.findTransactionById(item.id));
    setModalVisible(true);
  }

  // Function that returns the contents of the transactions screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Transactions</Text>
      <Text>Total amount spent: {myNumberFormatter.format(transactionContext.totalAmount)}</Text>   

      <View style={styles.mainBodyContainerLarge}>
        <AddTransaction modalVisibility={modalVisible} setVisibility={setModalVisible} transactionToEdit={transactionToEdit} clearTransactionToEdit={() => setTransactionToEdit(null)} />
        <View style={styles.transactionContainer}>
          <Text style={[styles.transactionElement, styles.transactionElementLeft]}>Name</Text>
          <Text style={styles.transactionElement}>Amount</Text>
          <Text style={styles.transactionElement}>Category</Text>
          <Text style={[styles.transactionElement, styles.transactionElementRight]}>Date</Text>
        </View>
        <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={item => item.index} /> 
      </View>      
    </SafeAreaView> 
    );
}

export default Transactions;