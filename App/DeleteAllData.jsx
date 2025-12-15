import {useContext} from "react";
import {Image, Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import User from "./User";
import UserDataContext from "./UserDataContext";
import ExpensesContext from "./ExpensesContext";
import TransactionsContext from "./TransactionsContext";
import CategoriesContext from "./CategoriesContext";

const ModifySalary = ({style}) => {
  const userDataContext = useContext(UserDataContext);
  const expensesContext = useContext(ExpensesContext);
  const transactionsContext = useContext(TransactionsContext);
  const categoriesContext = useContext(CategoriesContext);

  const deletaAllData = () => {
    userDataContext._setUserData(new User());
    expensesContext._setExpenseData([]);
    transactionsContext._setTransactionData([]);
    categoriesContext._setCategoryData([]);
  }

  return (
    <View style={[styles.mainBodyContainer, styles.border, style]}>
      <View style={styles.pageView}>
        <Pressable style={({pressed}) => [styles.deleteAllButton, styles.decline, pressed && styles.pressed]} 
                   onPress={() => deletaAllData()} >
          <Image style={styles.iconLarge}
                 source={require("./icons/deleteAllIcon.png")}
                 alt="Delete all data" />
          <Text>DELETE ALL DATA</Text>
        </Pressable> 
      </View>  
    </View>     
  );
}

export default ModifySalary;