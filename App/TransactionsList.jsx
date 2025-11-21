import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddTransaction from "./AddTransaction";
import TransactionsContext from "./TransactionsContext";

const TransactionsList = () => {
  const transactionsContext = useContext(TransactionsContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  useEffect(() => {
    fillData();
  }, [transactionsContext.transactionData]);

  const fillData = () => {
    const newDataArray = [];
    transactionsContext.transactionData.map((element, index) => {
      newDataArray.push({index: index, id: element.getId(), name: element.getName(), amount: element.getAmount(), category: element.getCategory().getName(), date: new Date(element.getTransactionDate()).toLocaleDateString()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (item.index === data.length - 1);
    return (
      <View style={[styles.transactionContainer, isLastItem && styles.lastItem]}>
        <Text style={[styles.transactionElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.transactionElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.transactionElement}>{item.category}</Text>
        <Text style={[styles.transactionElement, styles.transactionElementRight]}>{item.date}</Text>
        <Pressable style={({pressed}) => [styles.smallButton, styles.edit, pressed && styles.pressed]} onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
      </View>
    );
  }

  const editItemHandler = (item) => {
    setTransactionToEdit(transactionsContext.findTransactionById(item.id));
    setModalVisible(true);
  }

  return (
    <View style={styles.mainBodyContainerLarge}>
      <AddTransaction modalVisibility={modalVisible} setVisibility={setModalVisible} transactionToEdit={transactionToEdit} clearTransactionToEdit={() => setTransactionToEdit(null)} />
      <View style={styles.transactionContainer}>
        <Text style={[styles.transactionElement, styles.transactionElementLeft]}>Name</Text>
        <Text style={styles.transactionElement}>Amount</Text>
        <Text style={styles.transactionElement}>Category</Text>
        <Text style={[styles.transactionElement, styles.transactionElementRight]}>Date</Text>
      </View>
      <FlatList data={data} renderItem={(item) => renderItem(item, data)} keyExtractor={(item) => item.index} /> 
    </View>      
    );
}

export default TransactionsList;