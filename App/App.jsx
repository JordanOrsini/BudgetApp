import {StatusBar} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import UserDataProvider from "./UserDataProvider";
import CategoriesProvider from "./CategoriesProvider";
import ExpensesProvider from "./ExpensesProvider";
import TransactionsProvider from "./TransactionsProvider";
import BottomSheetProvider from "./BottomSheetProvider";
import KeyboardListenerProvider from "./KeyboardListenerProvider";

import BottomNavigation from "./BottomNavigation";

// Main function of the application. 
const App = () => {
  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardListenerProvider>
        <SafeAreaProvider>
          <UserDataProvider>
            <CategoriesProvider>
              <ExpensesProvider>
                <TransactionsProvider>
                  <BottomSheetProvider>
                    <NavigationContainer theme={myTheme}>
                      <StatusBar barStyle="dark-content" />
                      <BottomNavigation />
                    </NavigationContainer>
                  </BottomSheetProvider>
                </TransactionsProvider>
              </ExpensesProvider>
            </CategoriesProvider>
          </UserDataProvider>
        </SafeAreaProvider>
      </KeyboardListenerProvider>
    </GestureHandlerRootView>
  );
}

export default App;