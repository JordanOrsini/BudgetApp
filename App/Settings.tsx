import { SafeAreaView, Text } from "react-native";
import { styles } from "./Style";

function Settings() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Settings</Text>
    </SafeAreaView>
  );
}

export default Settings;