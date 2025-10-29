import {Component} from 'react';
import {Pressable, Text} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import Navigation from "./Navigation";
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the transactions screen of the application.
*/
class Transactions extends Component {
  static contextType = TransactionsContext;

  // Function that obtains all the transaction elements to be displayed on screen.
  getTransactions() {
    return (
      this.context.userData.map((element, index) => {return (
        <SafeAreaView key={index} style={styles.transactionElement}>
          <Text>{element}</Text>
          <Pressable style={styles.transactionRemove} onPress={() => this.removeItemHandler({index})}><Text>X</Text></Pressable>
        </SafeAreaView>
        )})
    )
  }

  // Function that handles the onPress event of a transaction element.
  // The function takes an index and will remove the corresponding transaction object from the transactions array.
  removeItemHandler = ({index}) => {
    const newTransactions = [...this.context.userData];
    newTransactions.splice(index, 1);
    this.context.setUserData(newTransactions);
  }

  // Function that returns the contents of the transactions screen.
  render() {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text style={styles.headerText}>Transactions</Text>
        <SafeAreaView>
          {this.getTransactions()}
        </SafeAreaView>
        <Navigation navigation={this.props.navigation}/>
      </SafeAreaView> 
    );
  }
}

export default Transactions;