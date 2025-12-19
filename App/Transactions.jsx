import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import TransactionsList from "./TransactionsList";

const Transactions = () => {
  // Function that returns the contents of the transactions screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
      <TransactionsList /> 
    </SafeAreaView> 
    );
}

export default Transactions;