import {useState} from "react";
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import EditUser from "./EditUser";
import DeleteAllData from "./DeleteAllData";
import EditCategoryList from "./EditCategoryList";
import Accordion from 'react-native-collapsible/Accordion';

const Settings = () => {
  const [activeSections, setActiveSections] = useState([0]);

  const SECTIONS = [
    {
      title: 'Edit user',
      content: <EditUser />,
    },
    {
      title: 'Edit categories',
      content: <EditCategoryList />,
    },
    {
      title: 'Delete all data',
      content: <DeleteAllData />,
    },
  ];

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Settings</Text>  
      </View> 
    );
  }

  const renderContent = (section) => {
    return (
      <View>
        {section.content}
      </View>
    );
  }

  const renderHeader = (section) => {
    return (
      <View style={styles.accordionHeader}>
        <Text style={styles.subHeaderText}>{section.title}</Text>
      </View>
    );
  }

  // Function that returns the contents of the settings screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
      <View style={[styles.mainBodyContainer, {alignItems: "center"}]}>
      <ListHeader />
      <Accordion sections={SECTIONS}
                 activeSections={activeSections}
                 onChange={setActiveSections}
                 renderHeader={(section) => renderHeader(section)}
                 renderContent={(section) => renderContent(section)} />
      </View>
    </SafeAreaView> 
  );
}

export default Settings;