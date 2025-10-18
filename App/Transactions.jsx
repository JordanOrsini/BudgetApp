import { Pressable, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";
import Navigation from "./Navigation";
import { useState } from "react";

function Transactions({ navigation }) {
  return (
    <SafeAreaView style={styles.pageView}>
      <Text style={styles.headerText}>Transactions</Text>
      <SafeAreaView>
        {GetTransactions()}
      </SafeAreaView>
      <Navigation navigation={navigation}/>
    </SafeAreaView> 
  );
}

function GetTransactions() {
  const [myTransactions, setMyTransactions] = useState([1, 2, 3]);

  function RemoveItem({ index }) {
    const newTransactions = [...myTransactions];
    newTransactions.splice(index, 1);
    setMyTransactions(newTransactions);
  }

  return(
  myTransactions.map((element, index) => {return (
    <SafeAreaView key={index} style={styles.transactionElement}>
      <Text>{element}</Text>
      <Pressable style={styles.transactionRemove} onPress={() => RemoveItem({ index })}><Text>X</Text></Pressable>
    </SafeAreaView>
  )
}))}

export default Transactions;