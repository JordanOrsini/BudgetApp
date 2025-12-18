import {useContext, useState} from "react";
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./Style";

import Goals from "./Goals";
import Accounts from "./Accounts";
import ExpensesList from "./ExpensesList";
import UserDataContext from "./UserDataContext";
import Accordion from 'react-native-collapsible/Accordion';

const Budget = () => {
  const userDataContext = useContext(UserDataContext);

  const [activeSections, setActiveSections] = useState([0]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  const SECTIONS = [
    {
      title: 'Expenses',
      content: <ExpensesList />,
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

  // Function that returns the contents of the budget screen.
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

export default Budget;