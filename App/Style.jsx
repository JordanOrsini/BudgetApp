import {Platform, StyleSheet} from "react-native";

///////////////////////////////////////////////////////////////////////////////////////////////////
// Inheritance CSS classes ////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
const appShadows = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.25,
      shadowRadius: 1,
    },
    default: {
      elevation: 2,
    },    
  }),
};
const button = {
  ...appShadows,
  backgroundColor: "#FFFFFF",
  width: 90,
  height: 45,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  margin: 5,
};
const listElement = {
  ...appShadows,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  height: 40,
  backgroundColor: "#FFFFFF",
  width: 90,
};
const listElementEnd = {
  ...listElement,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
};
const mainBodyContainer = {
  backgroundColor: "#E1E1E1",
  margin: 5,
  padding: 10,
  width: 380,
  borderRadius: 30,
  height: 320,
};
const modal = {
  ...appShadows,
  margin: 20,
  backgroundColor: "#ECECEC",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
};
const navButton = {
  ...appShadows,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  flex: 1,
  height: 40,
};
const textInput = {
  ...appShadows,
  borderRadius: 20,
  width: 295,
  marginTop: 10,
  marginBottom: 10,
  backgroundColor: "#FFFFFF",
  padding: 10,
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
    height: 90,
    width: 90,
  },
  deleteAllButton: {
    ...button,
    height: 80,
    width: 160,
  },
  smallButton: {
    ...button,
    width: 25,
    height: 25,
    borderRadius: 25,
    marginTop: 0,
    marginBottom: 0,
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
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  mainBodyContainerHeader: { 
    ...mainBodyContainer, 
    height: "auto",
    backgroundColor: "transparent",
  },
  mainBodyContainerLarge: {
    ...mainBodyContainer,
    ...Platform.select({
      ios: {
        height: 640,
      },
      default: {
        height: 690,
      },    
    }),
    backgroundColor: "transparent",
  },
  mainBodyContainerMedium: {
    ...appShadows,
    ...mainBodyContainer,
  },
  mainBodyContainerMicro: {
    ...appShadows, 
    ...mainBodyContainer, 
    height: 160,
    width: 185,
  },
  mainBodyContainerSmall: {
    ...appShadows, 
    ...mainBodyContainer, 
    height: 160,
  },
  modalNavContainer: {
    position: "absolute",
    width: "100%",
  },
  pageView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // List element CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  categoryListElement: {
    ...listElement,
    width: 360,
    borderRadius: 20,
  },
  expenseListElement: {
    ...listElement,
    width: 120,
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
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Modal CSS classes ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  modal: {
    ...modal,
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
  subHeaderText: {
    fontSize: 20,
  },
  textInput: {
    ...textInput,
  },
  textInputCalendar: {
    ...textInput,
    alignItems: "center",
  },
  textInputSmall: {
    ...textInput,
    width: 160,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Icon CSS classes /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  calendarIcon: {
    position: "absolute",
    marginLeft: 140,
  },
  icon: {
    height: 25,
    width: 25,
  },
  iconLarge: {
    height: 50,
    width: 50,
  },
});