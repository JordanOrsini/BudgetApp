import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";

function Overview() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Overview</Text>
    </SafeAreaView>
  );
}

export default Overview;