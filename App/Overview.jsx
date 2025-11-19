import {ScrollView, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

/* 
   Class representing the overview screen of the application.
*/
const Overview  = () => {
  // Function that returns the contents of the overview screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Overview</Text>

      <ScrollView>
        <View style={styles.mainBodyContainerMicro}></View>    
        <View style={styles.mainBodyContainerSmall}></View> 
        <View style={styles.mainBodyContainerSmall}></View> 
      </ScrollView>
    </SafeAreaView>  
  );
}

export default Overview;