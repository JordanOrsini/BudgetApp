import {Image, Text, View} from "react-native";
import {styles} from "./Style";

const AccountsInfographic = () => {
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  
  return (
    <View style={styles.horizontalContainer}>
      <Image style={styles.iconGiant}
             source={require("./icons/overviewGraphic.png")}
             alt="Accounts infographic" />
      <View style={{justifyContent: "center"}}>
        <View>
          <Text style={[styles.subHeaderText, {fontWeight: "bold"}]}>Account:</Text>
          <Text style={styles.subHeaderText}>TFSA</Text>
        </View>
        <View style={{marginTop: 25}}>
          <Text style={[styles.subHeaderText, {fontWeight: "bold"}]}>Amount:</Text>
          <Text style={styles.subHeaderText}>{myNumberFormatter.format(90000)}</Text>
        </View>
      </View>
    </View>
  );
}

export default AccountsInfographic;