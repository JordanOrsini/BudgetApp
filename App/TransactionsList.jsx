import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import AddTransactionModal from "./AddTransactionModal";
import TransactionsContext from "./TransactionsContext";

const TransactionsList = ({style}) => {
  const transactionsContext = useContext(TransactionsContext);

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    fillData();
  }, [transactionsContext.transactionData]);

  const editItemHandler = (item) => {
    setTransactionToEdit(transactionsContext.findTransactionById(item.id));
    setModalVisible(true);
  }

  const fillData = () => {
    const newDataArray = [];
    transactionsContext.transactionData.map((element, index) => {
      newDataArray.push({index: index, 
                         id: element.getId(),
                         name: element.getName(), 
                         amount: element.getAmount(), 
                         category: element.getCategory().getName(),
                         date: new Date(element.getTransactionDate()).toLocaleDateString()});
    });

    setData(newDataArray);
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (item.index === data.length - 1);
    return (
      <View style={[styles.listContainer, isLastItem && styles.lastItem]}>
        <Text style={styles.listElementStart}>{item.name}</Text>
        <Text style={styles.listElement}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.listElement}>{item.category}</Text>
        <Text style={styles.listElementEnd}>{item.date}</Text>
        <Pressable style={({pressed}) => [styles.smallButton, styles.edit, pressed && styles.pressed]} 
                   onPress={() => editItemHandler(item)}>
          <Text>e</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.mainBodyContainerLarge, style]}>
      <AddTransactionModal modalVisibility={modalVisible} 
                           setVisibility={setModalVisible} 
                           transactionToEdit={transactionToEdit} 
                           clearTransactionToEdit={() => setTransactionToEdit(null)} />
      <FlatList data={data} 
                renderItem={(item) => renderItem(item, data)} 
                keyExtractor={(item) => item.index} /> 
    </View>      
    );
}

export default TransactionsList;