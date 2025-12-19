import {Image, Text, View} from "react-native";
import {styles} from "./Style";

const IncomeOutflowGraphic = () => {  
  return (
    <View style={styles.mainBodyContainer}>
      <Text style={styles.containerHeaderText}>Income vs Outflows</Text>
      <Image style={styles.iconFull}
             source={require("./icons/incomeOutflowGraphic.png")}
             alt="Income vs Outflow graphic" />
    </View>
  );
}

export default IncomeOutflowGraphic;