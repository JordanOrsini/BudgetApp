import { Pressable, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";
import Navigation from "./Navigation";

function Overview({ navigation } : { navigation: any }) {
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Overview</Text>
      <Text style={styles.mainBodyText}>Main body</Text>
      <Navigation navigation={navigation}/>
    </SafeAreaView>  
  );
}

export default Overview;