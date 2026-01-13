import {useContext, useEffect, useState} from "react";
import {Pressable, Text, TextInput, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import TransactionsContext from "./TransactionsContext";
import BottomSheetContext from "./BottomSheetContext";
import KeyboardListenerContext from "./KeyboardListenerContext";

const TransactionsList = () => {
  const transactionsContext = useContext(TransactionsContext);
  const bottomSheetContext = useContext(BottomSheetContext);
  const keyboardListenerContext = useContext(KeyboardListenerContext);

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    fillData();
  }, [transactionsContext.transactionData, searchInput]);

  const editItemHandler = (item) => {
    bottomSheetContext._setContent("Transaction", transactionsContext.findTransactionById(item.id));
  }

  const fillData = () => {
    const newDataArray = [];
    let transactionData = [];

    if (searchInput === "") {
      transactionData = transactionsContext.transactionData;
    }
    else {
      transactionData = transactionsContext.findTransactionsByName(searchInput);
    }

    transactionData.map((element, index) => {
      newDataArray.push({index: index, 
                         id: element.getId(),
                         name: element.getName(), 
                         amount: element.getAmount(), 
                         categoryIcon: element.getCategory().getIconPath(),
                         date: new Date(element.getTransactionDate()).toLocaleDateString()});
    });

    setData(newDataArray);
  }

  const ListFooter = () => {
    return (   
      <TextInput style={[styles.searchInput, {marginTop: keyboardListenerContext.isKeyboardVisible ? 117 : 735,
                                              opacity: keyboardListenerContext.isKeyboardVisible ? 1 : 0.925}]} 
                 placeholder="Search..."
                 onChangeText={(text) => setSearchInput(text)} />
    );
  }

  const ListHeader = () => {
    return (
      <View style={styles.backgroundTransparent}>     
        <Text style={styles.headerText}>Transactions</Text>
        <View style={styles.horizontalContainer}>
          <Text numberOfLines={1} style={styles.listElementStart}>Name</Text>
          <Text numberOfLines={1} style={styles.listElement}>Amount</Text>    
          <Text numberOfLines={1} style={styles.listElementIconHeader}>Cat</Text>
          <Text numberOfLines={1} style={styles.listElementEnd}>Date</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}, data) => {
    const isLastItem = item.index === data.length - 1;
    return (
      <Pressable onPress={() => editItemHandler(item)}>
        {({pressed}) => (
        <View style={[styles.horizontalContainer, isLastItem && styles.lastItem]}>
          <Text numberOfLines={1} style={[styles.listElementStart, pressed && styles.pressed]}>{item.name}</Text>
          <Text numberOfLines={1} style={[styles.listElement, pressed && styles.pressed]}>{myNumberFormatter.format(item.amount)}</Text>    
          <View style={[styles.listElementIcon, pressed && styles.pressed]}>
            {getIconFromPath(item.categoryIcon)}
          </View>
          <Text numberOfLines={1} style={[styles.listElementEnd, pressed && styles.pressed]}>{item.date}</Text>
        </View>
        )}
      </Pressable>
    );
  }

  return (
    <View style={[(data.length === 0) && styles.mainBodyContainerSmall, {alignItems: "center"}]}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item, data)} 
                keyExtractor={(item) => item.index}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} />
      {ListFooter()}
    </View>
  );
}

export default TransactionsList;