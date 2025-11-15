import {Component} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from "./Style";

import TransactionsContext from './TransactionsContext';

/* 
   Class representing the transactions screen of the application.
*/
class Transactions extends Component {
  static contextType = TransactionsContext;

  constructor(props) {
    super(props);
    this.myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}); 

    this.contextUserData = null;

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.contextUserData = this.context.userData;
    this.fillData();
  }

  componentDidUpdate = () => {
    if (this.contextUserData !== this.context.userData) {
      this.contextUserData = this.context.userData;
      this.fillData();
    }
  }

  fillData = () => {
    const newDataArray = [];
    this.contextUserData.map((element, index) => {
      newDataArray.push({id: index, name: element.getName(), amount: element.getAmount(), category: element.getCategory().getName(), date: element.getTransactionDate()});
    });

    this.setState({data: newDataArray});
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.transactionContainer}>
        <Text style={[styles.transactionElement, styles.transactionElementLeft]}>{item.name}</Text>
        <Text style={styles.transactionElement}>{this.myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.transactionElement}>{item.category}</Text>
        <Text style={[styles.transactionElement, styles.transactionElementRight]}>{item.date}</Text>
        <Pressable style={({pressed}) => [styles.transactionRemove, styles.decline, pressed ? styles.pressed : '']} onPress={() => this.removeItemHandler(item.id)}>
          <Text>X</Text>
        </Pressable>
      </View>
    );
  }

  // Function that handles the onPress event of a transaction element.
  // The function takes an index and will remove the corresponding transaction object from the transactions array.
  removeItemHandler = (index) => {
    const newTransactions = [...this.contextUserData];
    newTransactions.splice(index, 1);
    this.context._setUserData(newTransactions);
  }

  // Function that returns the contents of the transactions screen.
  render() {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text style={styles.headerText}>Transactions</Text>
        <Text>Total amount spent: {this.myNumberFormatter.format(this.context.totalAmount)}</Text>   

        <View style={styles.mainBodyContainer}>
          <View style={styles.transactionContainer}>
            <Text style={[styles.transactionElement, styles.transactionElementLeft]}>Name</Text>
            <Text style={styles.transactionElement}>Amount</Text>
            <Text style={styles.transactionElement}>Category</Text>
            <Text style={[styles.transactionElement, styles.transactionElementRight]}>Date</Text>
          </View>
          <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={item => item.id} /> 
        </View>      
      </SafeAreaView> 
    );
  }
}

export default Transactions;