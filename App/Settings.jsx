import {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";
import {Text} from "react-native";

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
        <Text style={styles.mainBodyText}>Main body</Text>
        <Navigation navigation={this.props.navigation}/>
      </SafeAreaView> 
    );
  }
}

export default Settings;