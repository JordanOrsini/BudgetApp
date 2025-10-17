import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.headerText}>
      <Text>Hello World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;