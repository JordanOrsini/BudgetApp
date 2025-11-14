import {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";
import {Text, View} from "react-native";

import Navigation from "./Navigation";

/* 
   Class representing the settings screen of the application.
*/
class Settings extends Component {
  // Function that returns the contents of the settings screen.
  render () {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text style={styles.headerText}>Settings</Text>
        <View style={styles.mainBodyContainer}></View>
        <Navigation navigation={this.props.navigation} selectedIndex={3} />     
      </SafeAreaView> 
    );
  }
}

export default Settings;