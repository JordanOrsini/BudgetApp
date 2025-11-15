import {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";
import {Text, View} from "react-native";

/* 
   Class representing the budget screen of the application.
*/
class Budget extends Component {

  // Function that returns the contents of the budget screen.
  render () {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text style={styles.headerText}>Budget</Text>
        <View style={styles.mainBodyContainer}></View>  
      </SafeAreaView>
    );
  }
}

export default Budget;