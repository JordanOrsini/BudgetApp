import { SafeAreaView, Text } from "react-native";
import { styles } from "./Style";

function Budget() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Budget</Text>
    </SafeAreaView>
  );
}

export default Budget;