import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";
import Navigation from "./Navigation";

function Transactions({ navigation } : { navigation: any }) {
  return (
    <SafeAreaView style={styles.pageView}>
      <SafeAreaView>
        <Text style={styles.headerText}>Transactions</Text>
      </SafeAreaView>
      
      <Navigation navigation={navigation}/>
    </SafeAreaView> 
  );
}

export default Transactions;