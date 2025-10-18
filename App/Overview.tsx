import { Pressable, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Style";

function Overview({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.pageView}>
      <SafeAreaView>
        <Text style={styles.headerText}>Overview</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.navigation}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Overview')}>
          <Text>Overview</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Budget')}>
          <Text>Budget</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Transactions')}>
          <Text>Transactions</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text>Settings</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>  
  );
}

export default Overview;