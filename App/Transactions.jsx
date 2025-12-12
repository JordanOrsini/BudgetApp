import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import TransactionsList from "./TransactionsList";
import TransactionsContext from "./TransactionsContext";

const Transactions = () => {
  const transactionContext = useContext(TransactionsContext);

  const data = [{index: 0}];
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>      
        <Text style={styles.headerText}>Transactions</Text>
        <Text style={styles.subHeaderText}>Total amount spent: {myNumberFormatter.format(transactionContext.totalAmount)}</Text> 
      </View>
    );
  }

  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <TransactionsList />   
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the transactions screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]} />    
    </SafeAreaView> 
    );
}

export default Transactions;