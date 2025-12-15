import {useWindowDimensions} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import TransactionsList from "./TransactionsList";

const Transactions = () => {
  const data = [{index: 0}];
  const windowHeight = useWindowDimensions().height;

  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <TransactionsList style={{height: windowHeight, padding: 0}}/>   
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the transactions screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false} />    
    </SafeAreaView> 
    );
}

export default Transactions;