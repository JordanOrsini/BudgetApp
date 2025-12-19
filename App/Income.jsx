import {useContext} from "react";
import {Text, View} from "react-native";
import {styles} from "./Style";

import UserDataContext from "./UserDataContext";

const Income = () => {
  const userDataContext = useContext(UserDataContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});
  
  return (
    <View style={[styles.mainBodyContainer, {alignItems: "center"}]}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.incomeListElementStart}>Username</Text>
        <Text style={styles.incomeListElementEnd}>{userDataContext.userData.getName()}</Text>
      </View>
      <View style={styles.horizontalContainer}>
        <Text style={styles.incomeListElementStart}>Salary</Text>
        <Text style={styles.incomeListElementEnd}>{myNumberFormatter.format(userDataContext.userData.getSalary())}</Text>
      </View>
    </View>
  );
}

export default Income;