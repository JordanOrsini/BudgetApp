import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Budget from "./Budget";
import Overview from "./Overview";
import Settings from "./Settings";
import Transactions from "./Transactions";

import Navigation from "./Navigation";

const Tab = createBottomTabNavigator();

/* 
   Class representing the navigation component of the application.
*/
const BottomNavigation = () => {
  return (
    <Tab.Navigator backBehavior={"history"} tabBar={(props) => <Navigation {...props}/>} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;