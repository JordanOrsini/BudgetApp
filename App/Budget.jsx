import {useContext, useState} from "react";
import {Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import Goals from "./Goals";
import Accounts from "./Accounts";
import ExpensesList from "./ExpensesList";
import UserDataContext from "./UserDataContext";
import BottomSheetContext from "./BottomSheetContext";
import Accordion from 'react-native-collapsible/Accordion';

const Budget = () => {
  const userDataContext = useContext(UserDataContext);
  const bottomSheetContext = useContext(BottomSheetContext);

  const data = [{index: 0}];
  const [activeSections, setActiveSections] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  const SECTIONS = [
    {
      title: 'Expenses',
      content: <ExpensesList style={styles.mainBodyContainerSmall} />,
    },
    {
      title: 'Accounts',
      content: <Accounts />,
    },
    {
      title: 'Goals',
      content: <Goals />,
    },
  ];

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Budget</Text>
        <Text style={styles.subHeaderText}>Salary: {myNumberFormatter.format(userDataContext.userData.getSalary())}</Text>
      </View>
    );
  }

  const renderHeader = (section) => {
    return (
      <View style={{borderRadius: 20, paddingLeft: 10, margin: 10, height: 80, borderWidth: 2, justifyContent: "center"}}>
        <Text>{section.title}</Text>
      </View>
    );
  }

  const renderContent = (section) => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  }
  
  const renderItem = ({item}) => {
    switch (item.index) {
      case 0: {
        return (
          <Accordion sections={SECTIONS}
                     activeSections={activeSections}
                     renderHeader={(section) => renderHeader(section)}
                     renderContent={(section) => renderContent(section)}
                     onChange={setActiveSections} />
        );
      }
      default: {
        break;
      }
    }
  }

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!bottomSheetContext.bottomSheetVisible} />
    </SafeAreaView>
  );
}

export default Budget;