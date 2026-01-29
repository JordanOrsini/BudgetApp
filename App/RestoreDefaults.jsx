import {useContext} from "react";
import {Image, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import UserDataContext from "./UserDataContext";
import ExpensesContext from "./ExpensesContext";
import TransactionsContext from "./TransactionsContext";
import CategoriesContext from "./CategoriesContext";

const RestoreDefaults = () => {
  const userDataContext = useContext(UserDataContext);
  const categoriesContext = useContext(CategoriesContext);
  const expensesContext = useContext(ExpensesContext);
  const transactionsContext = useContext(TransactionsContext);

  const restoreDefaultData = () => {
    userDataContext._setUserData(userDataContext.defaultData);
    categoriesContext._setCategoryData(categoriesContext.defaultData);
    expensesContext._setExpenseData(expensesContext.defaultData);
    transactionsContext._setTransactionData(transactionsContext.defaultData);
  }

  return (
    <View style={[styles.mainBodyContainer, {alignItems: "center"}]}>
      <View style={styles.pageView}>
        <Pressable style={({pressed}) => [styles.deleteAllButton, styles.edit, pressed && styles.pressed]} 
                   onPress={() => restoreDefaultData()} >
          <Image style={styles.iconLarge}
                 source={require("./icons/editIcon.png")}
                 alt="Restore default data" />
          <Text>RESTORE DEFAULT DATA</Text>
        </Pressable> 
      </View>  
    </View>     
  );
}

export default RestoreDefaults;