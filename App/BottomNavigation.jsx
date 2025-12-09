import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Overview from "./Overview";
import Budget from "./Budget";
import Transactions from "./Transactions";
import Settings from "./Settings";

import Navigation from "./Navigation";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const Loading = () => {
  }

  return (
    <Tab.Navigator initialRouteName={"Loading"}
                   backBehavior={"history"} 
                   tabBar={(props) => <Navigation {...props}/>} 
                   screenOptions={{headerShown: false}}>
      <Tab.Screen name="Overview" 
                  component={Overview} />
      <Tab.Screen name="Budget" 
                  component={Budget} />
      <Tab.Screen name="Transactions" 
                  component={Transactions} />
      <Tab.Screen name="Settings" 
                  component={Settings} />
      <Tab.Screen name="Loading" 
                  component={Loading} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;