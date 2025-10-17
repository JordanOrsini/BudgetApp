import { SafeAreaView, Text } from "react-native";
import { styles } from "./Style";

function Transactions() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Transactions</Text>
    </SafeAreaView>
  );
}

export default Transactions;