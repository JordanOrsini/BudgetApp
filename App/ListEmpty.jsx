import {Image, Text, View} from "react-native";
import {styles} from "./Style";

const ListEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image style={styles.iconLarge}
             source={require("./icons/emptyIcon.png")}
             alt="Empty" />
      <Text>Empty</Text>
    </View>
  );
}

export default ListEmpty