import { SafeAreaProvider } from 'react-native-safe-area-context';
import Overview from './Overview';
import Budget from './Budget';
import Settings from './Settings';
import Transactions from './Transactions';

function App() {
  return (
    <SafeAreaProvider>
      <Transactions />
    </SafeAreaProvider>
  );
}

export default App;