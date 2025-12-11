import {LogBox} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import UserDataProvider from "./UserDataProvider";
import CategoriesProvider from "./CategoriesProvider";
import ExpensesProvider from "./ExpensesProvider";
import TransactionsProvider from "./TransactionsProvider";
import BottomSheetProvider from "./BottomSheetProvider";

import BottomNavigation from "./BottomNavigation";

/* 
   Main function of the application. 
   Returns the contents of the application.
   Navigation between the main screens of the application is defined here. 
   SafeAreaProvider ensures content of the application is not displayed where camera cutouts are located.
*/
const App = () => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <UserDataProvider>
          <CategoriesProvider>
            <ExpensesProvider>
              <TransactionsProvider>
                <BottomSheetProvider>
                  <NavigationContainer>
                    <BottomNavigation />
                  </NavigationContainer>
                </BottomSheetProvider>
              </TransactionsProvider>
            </ExpensesProvider>
          </CategoriesProvider>
        </UserDataProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;