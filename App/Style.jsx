import {Platform, StyleSheet} from "react-native";

///////////////////////////////////////////////////////////////////////////////////////////////////
// Inheritance CSS classes ////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
const button = {
  backgroundColor: "#FFFFFF",
  width: 80,
  height: 40,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  margin: 10,
  elevation: 5,
};

const listElement = {
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  height: 40,
  backgroundColor: "#FFFFFF",
  width: 82,
};

const listElementEnd = {
  ...listElement,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
};

const mainBodyContainer = {
  backgroundColor: "#E1E1E1",
  padding: 10,
  marginTop: 10,
  width: 380,
  borderRadius: 30,
  height: 320,
};

const modal = {
  margin: 20,
  backgroundColor: "#ECECEC",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  elevation: 5,
};

const navButton = {
  elevation: 5,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  flex: 1,
  height: 40,
};

// Style sheets CSS for the entire application.
export const styles = StyleSheet.create({
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Button CSS classes ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  button: {
    ...button,
  },
  categoryButtons: {
    ...button,
    borderRadius: 50,
    height: 80,
  },
  smallButton: {
    ...button,
    width: 20,
    height: 20,
    borderRadius: 25,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "normal",
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Colour CSS classes ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  accept: {
    backgroundColor: "#A0FAA0",
  },
  decline: {
    backgroundColor: "#F76464",
  },
  edit: {
    backgroundColor: "#FFB343",
  },
  hide: {
    opacity: 0,
  },
  pressed: {
    backgroundColor: "#FDFD96",
  },
  selected: {
    backgroundColor: "#ADD8E6",
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Container CSS classes ////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  categoryContainer: {
    height: 200,
    width: 300,
  },
  intervalContainer: {
    height: 125,
    width: 300,
  },
  lastContainer: {
    ...Platform.select({
      ios: {
        marginBottom: 75,
      },
      default: {
        marginBottom: 100,
      },    
    }),
  },
  mainBodyContainer: {
    ...mainBodyContainer,
  },
  mainBodyContainerLarge: {
    ...mainBodyContainer,
    ...Platform.select({
      ios: {
        height: 580,
      },
      default: {
        height: 640,
      },    
    }),
  },
  mainBodyContainerMicro: { 
    ...mainBodyContainer, 
    height: 160,
  },
  modalNavContainer: {
    position: "absolute",
    width: "100%",
  },
  pageView: {
    alignItems: "center",
    flex: 1,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // List element CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  categoryListElement: {
    ...listElement,
    width: 330,
    borderRadius: 20,
  },
  expenseListElement: {
    ...listElement,
    width: 110,
  },
  lastItem: {
    ...Platform.select({
      ios: {
        paddingBottom: 70,
      },
      default: {
        paddingBottom: 85,
      },    
    }),
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  listElement: {
    ...listElement,
  },
  listElementEnd: {
    ...listElementEnd,
  },
  listElementStart: {
    ...listElement,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  recentExpenseListElement: {
    ...listElement,
    width: 120,
  },
  recentTransactionListElement: {
    ...listElement,
    width: 90,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Modal CSS classes ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  modal: {
    ...modal,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuModal: {
    ...modal,
    margin: 75,
    marginBottom: 20,
  },
  modalPositioning: {
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 100,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Navigation CSS classes ///////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  navButton: {
    ...navButton,
  },
  navButtonLeft: {
    ...navButton,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginLeft: 10,
  },
  navButtonMiddle: {
    ...navButton,
    borderRadius: 50,
    height: 80,
    marginLeft: 5,
    marginRight: 5,
  },
  navButtonMiddleLeft: {
    ...navButton,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  navButtonMiddleRight: {
    ...navButton,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  navButtonRight: {
    ...navButton,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: 10,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    paddingBottom: 40,
    ...Platform.select({
      ios: {
        marginTop: 750,
      },
      default: {
        marginTop: 775,
      },    
    }),
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Text CSS classes /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  creationText: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  textInput: {
    borderRadius: 20,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    padding: "10",
    elevation: 5,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Icon CSS classes /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  calendarIcon: {
    position: "absolute",
    marginLeft: 150,
  },
});