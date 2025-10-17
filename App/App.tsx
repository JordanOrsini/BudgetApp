import { Text } from 'react-native';
import { styles } from './Style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <SafeAreaView style={styles.headerView}>
      <Text style={styles.headerText}>Hello World!</Text>
    </SafeAreaView>
  );
};

export default App;