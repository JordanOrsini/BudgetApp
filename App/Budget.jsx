import {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";
import {Text} from "react-native";

import Navigation from "./Navigation";

/* 
   Class representing the budget screen of the application.
*/
class Budget extends Component {

  // Function that returns the contents of the budget screen.
  render () {
    return (
      <SafeAreaView style={styles.pageView}>

        <Text style={styles.headerText}>Budget</Text>
        <Text style={styles.mainBodyText}>Main body</Text>

        <Navigation navigation={this.props.navigation} selectedIndex={1} />
        
      </SafeAreaView>
    );
  }
}

export default Budget;