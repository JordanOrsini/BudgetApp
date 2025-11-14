import {Component} from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
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

    this.contextUserData = null;

    this.state = {
      data: [],
      totalAmount: 0,
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
    let newTotalAmount = 0;
    this.contextUserData.map((element, index) => {
      newDataArray.push({id: index, name: element.getName(), amount: element.getAmount(), category: element.getCategory().getName(), date: element.getTransactionDate()});
      newTotalAmount = newTotalAmount + element.getAmount();
    });

    this.setState({data: newDataArray, totalAmount: newTotalAmount});
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.transactionElement}>
        <Text>{item.name + " | " + this.myNumberFormatter.format(item.amount) + " | " + item.category + " | " + item.date}</Text>
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
        <Text>Total amount spent: {this.myNumberFormatter.format(this.state.totalAmount)}</Text>
        <Text>Name | Amount | Category | Date</Text>

        <View style={styles.scrollView}>
          <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={item => item.id} numColumns={1} /> 
        </View>

        <Navigation navigation={this.props.navigation} selectedIndex={2} />
        
      </SafeAreaView> 
    );
  }
}

export default Transactions;