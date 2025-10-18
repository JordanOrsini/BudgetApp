import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";

function Settings() {
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Settings</Text>
    </SafeAreaView>
  );
}

export default Settings;