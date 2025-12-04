import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import AddTransactionModal from "./AddTransactionModal";
import TransactionsContext from "./TransactionsContext";

const TransactionsList = ({style, size}) => {
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
      if (!size || (size && index < size))
        newDataArray.push({index: index, 
                           id: element.getId(),
                           name: element.getName(), 
                           amount: element.getAmount(), 
                           categoryIcon: element.getCategory().getIconPath(),
                           date: new Date(element.getTransactionDate()).toLocaleDateString()});
    });

    setData(newDataArray);
  }

  const ListHeader = () => {
    return (
      <View>
        {size &&
        <Text style={styles.subHeaderText}>Recent transactions</Text>
        }
        {!size &&
        <Text style={styles.subHeaderText}>Transactions</Text>
        }
        <View style={styles.listContainer}>
          <Text numberOfLines={1} style={styles.listElementStart}>Name</Text>
          <Text numberOfLines={1} style={styles.listElement}>Amount</Text>    
          <Text numberOfLines={1} style={styles.listElementIconHeader}>Cat</Text>
          <Text numberOfLines={1} style={styles.listElementEnd}>Date</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}, data) => {
    const isLastItem = (!size && (item.index === data.length - 1));
    return (
      <View style={[styles.listContainer, isLastItem && styles.lastItem]}>
        <Pressable onPress={() => editItemHandler(item)}>
          {({pressed}) => (
          <View style={styles.horizontalContainer}>
            <Text numberOfLines={1} style={[styles.listElementStart, pressed && styles.pressed]}>{item.name}</Text>
            <Text numberOfLines={1} style={[styles.listElement, pressed && styles.pressed]}>{myNumberFormatter.format(item.amount)}</Text>    
            <View style={[styles.listElementIcon, pressed && styles.pressed]}>
              {getIconFromPath(item.categoryIcon)}
            </View>
            <Text numberOfLines={1} style={[styles.listElementEnd, pressed && styles.pressed]}>{item.date}</Text>
          </View>
          )}
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
      <ListHeader />
      <FlatList data={data} 
                renderItem={(item) => renderItem(item, data)} 
                keyExtractor={(item) => item.index}
                scrollEnabled={size === undefined}
                ListEmptyComponent={ListEmpty}
                showsVerticalScrollIndicator={false} /> 
    </View>      
    );
}

export default TransactionsList;