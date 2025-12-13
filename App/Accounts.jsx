import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";

const Accounts = ({style}) => {
  const ListHeader = () => {
    return (
      <View style={styles.background}>
        <Text style={styles.subHeaderText}>Accounts</Text>
      </View>
    );
  }

  return (
    <View style={[styles.mainBodyContainerSmall, style]}>    
      <FlatList ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false} /> 
    </View>
  );
}

export default Accounts;