import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import CategoriesProvider from './CategoriesProvider';
import TransactionsProvider from './TransactionsProvider';

import BottomNavigation from './BottomNavigation';

/* 
   Main function of the application. 
   Returns the contents of the application.
   Navigation between the main screens of the application is defined here. 
   SafeAreaProvider ensures content of the application is not displayed where camera cutouts are located.
*/
const App = () => {
  return (
    <SafeAreaProvider>
      <TransactionsProvider>
        <CategoriesProvider>
          <NavigationContainer>
            <BottomNavigation />
          </NavigationContainer>
        </CategoriesProvider>
      </TransactionsProvider>
    </SafeAreaProvider>
  );
}

export default App;