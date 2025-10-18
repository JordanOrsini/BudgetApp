import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Overview from './Overview';
import Budget from './Budget';
import Transactions from './Transactions';
import Settings from './Settings';

function App() {
  const navigationStack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <navigationStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Overview">
          <navigationStack.Screen name="Overview" component={Overview} />
          <navigationStack.Screen name="Budget" component={Budget} />
          <navigationStack.Screen name="Transactions" component={Transactions} />
          <navigationStack.Screen name="Settings" component={Settings} />
        </navigationStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;