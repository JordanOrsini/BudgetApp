import {Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

/* 
   Class representing the overview screen of the application.
*/
const Overview  = (props) => {
  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Overview</Text>
      <View style={styles.mainBodyContainer}></View>    
    </SafeAreaView>  
  );
}

export default Overview;