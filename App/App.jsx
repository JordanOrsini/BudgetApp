import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";

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
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
}

export default App;