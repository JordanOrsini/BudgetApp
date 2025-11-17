import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";
import {Text, View} from "react-native";

/* 
   Class representing the budget screen of the application.
*/
const Budget = () => {

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Budget</Text>
      <View style={styles.mainBodyContainer}></View>  
    </SafeAreaView>
  );
}

export default Budget;