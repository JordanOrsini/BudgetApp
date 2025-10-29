import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Budget from './Budget';
import Overview from './Overview';
import Settings from './Settings';
import Transactions from './Transactions';
import TransactionsProvider from './TransactionsProvider';

/* 
   Main function of the application. 
   Returns the contents of the application.
   Navigation between the main screens of the application is defined here. 
   SafeAreaProvider ensures content of the application is not displayed where camera cutouts are located.
*/
const App = () => {
  const navigationStack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <TransactionsProvider>
        <NavigationContainer>
          <navigationStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Overview">
            <navigationStack.Screen name="Overview" component={Overview} />
            <navigationStack.Screen name="Budget" component={Budget} />
            <navigationStack.Screen name="Transactions" component={Transactions} />
            <navigationStack.Screen name="Settings" component={Settings} />
          </navigationStack.Navigator>
        </NavigationContainer>
      </TransactionsProvider>
    </SafeAreaProvider>
  );
}

export default App;