import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import EditUser from "./EditUser";
import DeleteAllData from "./DeleteAllData";
import RestoreDefaults from "./RestoreDefaults";
import EditCategoryList from "./EditCategoryList";
import BottomSheetContext from "./BottomSheetContext";
import Accordion from 'react-native-collapsible/Accordion';

const Settings = () => {
  const bottomSheetContext = useContext(BottomSheetContext);
  const [activeSections, setActiveSections] = useState([]);

  const SECTIONS = [
    {
      index: 0,
      title: 'Edit user',
      content: <EditUser />,
    },
    {
      index: 1,
      title: 'Edit categories',
      content: <EditCategoryList />,
    },
    {
      index: 2,
      title: 'Manage data',
      content: <View>
                 <RestoreDefaults />
                 <DeleteAllData />
               </View>,
    },
  ];

  useEffect(() => {
      setActiveSections([1]);
    }, []);

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
      <View>
        <Text style={styles.subHeaderText}>{section.title}</Text>
      </View>
    );
  }

  // Function that returns the contents of the settings screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
      <Accordion sections={SECTIONS}
                 activeSections={activeSections}
                 onChange={setActiveSections}
                 renderHeader={renderHeader}
                 renderContent={renderContent}
                 keyExtractor={(item) => item.index}
                 touchableComponent={Pressable}
                 touchableProps={{style: ({pressed}) => [styles.accordionHeader, pressed && styles.pressed]}}
                 renderAsFlatList={true}
                 ListHeaderComponent={ListHeader}
                 stickyHeaderIndices={[0]}
                 showsVerticalScrollIndicator={false}
                 containerStyle={styles.lastContainer}
                 scrollEnabled={!bottomSheetContext.bottomSheetVisible} />
    </SafeAreaView> 
  );
}

export default Settings;