import {useContext} from "react";
import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import TransactionsList from "./TransactionsList";
import TransactionsContext from "./TransactionsContext";

const Transactions = () => {
  const transactionContext = useContext(TransactionsContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  // Function that returns the contents of the transactions screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Transactions</Text>
      <Text>Total amount spent: {myNumberFormatter.format(transactionContext.totalAmount)}</Text>   
      <TransactionsList />     
    </SafeAreaView> 
    );
}

export default Transactions;