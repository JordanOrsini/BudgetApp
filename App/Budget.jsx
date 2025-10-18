import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";
import Navigation from "./Navigation";

function Budget({ navigation }) {
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Budget</Text>
      <Text style={styles.mainBodyText}>Main body</Text>
      <Navigation navigation={navigation}/>
    </SafeAreaView>
  );
}

export default Budget;