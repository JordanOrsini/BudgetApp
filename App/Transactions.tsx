import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";

function Transactions() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Transactions</Text>
    </SafeAreaView>
  );
}

export default Transactions;