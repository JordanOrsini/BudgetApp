import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";

function Budget() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Budget</Text>
    </SafeAreaView>
  );
}

export default Budget;