import {Component} from 'react';
import {Pressable, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import Navigation from "./Navigation";
import TransactionsContext from './TransactionsContext';

/* 
   Class representing the transactions screen of the application.
*/
class Transactions extends Component {
  static contextType = TransactionsContext;

  constructor(props) {
    super(props);
    this.myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}); 
  }

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
        <View key={index} style={styles.transactionElement}>
          <Text>{element.getName() + " | " + this.myNumberFormatter.format(element.getAmount()) + " | " + element.getCategory().getName() + " | " + element.getTransactionDate()}</Text>
          <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed ? styles.pressed : '']} onPress={() => this.removeItemHandler(index)}>
            <Text>X</Text>
          </Pressable>
        </View>
        )})
    )
  }

  // Function that handles the onPress event of a transaction element.
  // The function takes an index and will remove the corresponding transaction object from the transactions array.
  removeItemHandler = (index) => {
    const newTransactions = [...this.context.userData];
    newTransactions.splice(index, 1);
    this.context._setUserData(newTransactions);
  }

  // Function that returns the contents of the transactions screen.
  render() {
    return (
      <SafeAreaView style={styles.pageView}>

        <Text style={styles.headerText}>Transactions</Text>
        <Text>Total amount spent: {this.myNumberFormatter.format(this.getTotalAmount())}</Text>
        <Text>Name | Amount | Category | Date</Text>

        <View style={styles.scrollView}>
          <ScrollView>
            {this.getTransactions()}
          </ScrollView>
        </View>

        <Navigation navigation={this.props.navigation} selectedIndex={2} />
        
      </SafeAreaView> 
    );
  }
}

export default Transactions;