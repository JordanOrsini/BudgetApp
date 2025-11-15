import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";
import {Text, View} from "react-native";

import RemoveCategory from "./RemoveCategory";

/* 
   Class representing the settings screen of the application.
*/
const Settings = (props) => {
  // Function that returns the contents of the settings screen.
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Settings</Text>
      <View style={styles.mainBodyContainer}>
        <RemoveCategory />
      </View>  
    </SafeAreaView> 
  );
}

export default Settings;