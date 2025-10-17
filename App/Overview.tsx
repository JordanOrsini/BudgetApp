import { SafeAreaView, Text } from "react-native";
import { styles } from "./Style";

function Overview() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Overview</Text>
    </SafeAreaView>
  );
}

export default Overview;