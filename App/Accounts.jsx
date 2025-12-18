import {useContext} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {getIconFromPath} from "./LogoIconManager";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import BottomSheetContext from "./BottomSheetContext";

const Accounts = ({style}) => {
  const bottomSheetContext = useContext(BottomSheetContext);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  const data = [{id: 0, name: "Savings", amount: 5000, icon: "nationalBankLogo.png"},
                {id: 1, name: "TFSA", amount: 90000, icon: "questradeLogo.png"} ,   
                {id: 2, name: "Investments", amount: 2000, icon: "bmoLogo.png"},
                {id: 3, name: "RRSP", amount: 20000, icon: "tdBankLogo.png"},
                {id: 4, name: "Chequing", amount: 10000, icon: "scotiaBankLogo.png"},
                {id: 5, name: "FHSA", amount: 14000, icon: "wealthsimpleLogo.png"},
               ]

  const renderItem = ({item}) => {
    return (
      <View style={styles.horizontalContainer}>
        <View style={styles.accountListElementStart}>{getIconFromPath(item.icon)}</View>
        <Text style={styles.listElementStart}>{myNumberFormatter.format(item.amount)}</Text>
        <Text style={styles.listElementEnd}>{item.name}</Text>
      </View> 
    );
  }

  return (
    <View style={[styles.mainBodyContainerSmall, style]}>
      <FlatList data={data}
                renderItem={renderItem}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} /> 
    </View>
  );
}

export default Accounts;