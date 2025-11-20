import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useEffect} from "react";
import {LogBox} from "react-native";

import CategoriesProvider from "./CategoriesProvider";
import ExpensesProvider from "./ExpensesProvider";
import TransactionsProvider from "./TransactionsProvider";

import BottomNavigation from "./BottomNavigation";

/* 
   Main function of the application. 
   Returns the contents of the application.
   Navigation between the main screens of the application is defined here. 
   SafeAreaProvider ensures content of the application is not displayed where camera cutouts are located.
*/
const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaProvider>
      <CategoriesProvider>
        <ExpensesProvider>
          <TransactionsProvider>
            <NavigationContainer>
              <BottomNavigation />
            </NavigationContainer>
          </TransactionsProvider>
        </ExpensesProvider>
      </CategoriesProvider>
    </SafeAreaProvider>
  );
}

export default App;