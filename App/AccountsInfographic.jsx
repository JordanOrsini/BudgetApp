import {Image, Text, View} from "react-native";
import {styles} from "./Style";

/**
 * Accounts infographic component. 
 * Represents a reactive infographic showcasing the user's various accounts and their current 
 * values.
 * 
 * @returns {JSX.Element} The infographic showcasing the user's accounts.
 */
const AccountsInfographic = () => {
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  
  // [TODO]: Placeholder infographic image and selected account data for now.
  return (
    <View style={styles.mainBodyContainer}>
      <Text style={styles.containerHeaderText}>Accounts</Text>
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
    </View>
  );
}

export default AccountsInfographic;