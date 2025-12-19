import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
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

  const [activeSections, setActiveSections] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  const SECTIONS = [
    {
      index: 0,
      title: 'Expenses',
      content: <ExpensesList />,
    },
    {
      index: 1,
      title: 'Accounts',
      content: <Accounts />,
    },
    {
      index: 2,
      title: 'Goals',
      content: <Goals />,
    },
  ];

  useEffect(() => {
    setActiveSections([0]);
  }, []);

  const ListHeader = () => {
    return (
      <View style={styles.mainBodyContainer}>
        <Text style={styles.headerText}>Budget</Text>
        <Text style={styles.subHeaderText}>Salary: {myNumberFormatter.format(userDataContext.userData.getSalary())}</Text>
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

  // Function that returns the contents of the budget screen.
  return (
    <SafeAreaView style={styles.pageView}
                  edges={["left", "right"]}>
      <View style={[styles.mainBodyContainer, {alignItems: "center"}]}>
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
                   scrollEnabled={!bottomSheetContext.bottomSheetVisible} />
      </View>
    </SafeAreaView>
  );
}

export default Budget;