import {Component} from 'react';
import {Text} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import Navigation from "./Navigation";

/* 
   Class representing the overview screen of the application.
*/
class Overview extends Component {
  // Function that returns the contents of the overview screen.
  render () {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text style={styles.headerText}>Overview</Text>
        <Text style={styles.mainBodyText}>Main body</Text>
        <Navigation navigation={this.props.navigation}/>
      </SafeAreaView>  
    );
  }
}

export default Overview;