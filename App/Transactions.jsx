import {Component} from 'react';
import {Pressable, ScrollView, Text} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import Navigation from "./Navigation";
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the transactions screen of the application.
*/
class Transactions extends Component {
  static contextType = TransactionsContext;

  getTotalAmount() {
    let totalAmount = 0;
    this.context.userData.map((element) => {
      totalAmount = totalAmount + element.getAmount();
      });

    return totalAmount;
  }

  // Function that obtains all the transaction elements to be displayed on screen.
  getTransactions() {
    return (
      this.context.userData.map((element, index) => {return (
        <SafeAreaView key={index} style={styles.transactionElement}>
          <Text>{element.getName() + " | " + element.getAmount() + " | " + element.getCategory() + " | " + element.getTransactionDate()}</Text>
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
    this.context._setUserData(newTransactions);
  }

  // Function that returns the contents of the transactions screen.
  render() {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text style={styles.headerText}>Transactions</Text>
        <SafeAreaView style={styles.scrollView}>
          <ScrollView>
            <Text>Total amount spent: ${this.getTotalAmount()}</Text>
            <Text>Name | Amount | Category | Date</Text>
            {this.getTransactions()}
          </ScrollView>
        </SafeAreaView>
        <Navigation navigation={this.props.navigation}/>
      </SafeAreaView> 
    );
  }
}

export default Transactions;