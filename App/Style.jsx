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
  paddingLeft: 6,
  paddingRight: 6,
  lineHeight: 40,
  backgroundColor: "#FFFFFF",
  width: 105,
};
const listElementEnd = {
  ...listElement,
  paddingRight: 12,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
};
const listElementStart = {
  ...listElement,
  paddingLeft: 12,
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
};
const mainBodyContainer = {
  borderWidth: 2,
  borderColor: "#E1E1E1",
  outlineWidth: 2,
  outlineColor: "#FFFFFF",
  margin: 5,
  padding: 10,
  width: 380,
  borderRadius: 30,
  height: 345,
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
  marginTop: 5,
  marginBottom: 5,
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
    padding: 15,
  },
  deleteAllButton: {
    ...button,
    height: 80,
    width: 290,
  },
  smallButton: {
    ...button,
    width: 25,
    height: 25,
    borderRadius: 25,
    marginTop: 0,
    marginBottom: 10,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Colour CSS classes ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  accept: {
    borderWidth: 2,
    borderColor: "#A0FAA0",
  },
  decline: {
    borderWidth: 2,
    borderColor: "#F76464",
  },
  edit: {
    borderWidth: 2,
    borderColor: "#FFB343",
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
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  intervalContainer: {
    height: 125,
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
    borderWidth: 0,
    outlineWidth: 0,
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
  },
  mainBodyContainerMedium: {
    ...mainBodyContainer,
  },
  mainBodyContainerSmall: {
    ...mainBodyContainer, 
    height: 260,
  },
  modalNavContainer: {
    position: "absolute",
    width: "100%",
  },
  pageView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Icon CSS classes /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  calendarIcon: {
    position: "absolute",
    marginLeft: 140,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconLarge: {
    height: 36,
    width: 36,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // List element CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  categoryListElementEndHeader: {
    ...listElementEnd,
    width: 175,
    textAlign: "center",
  },
  categoryListElementEnd: {
    ...listElementEnd,
    width: 175,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryListElementStart: {
    ...listElementStart,
    width: 175,
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  listElement: {
    ...listElement,
  },
  listElementEnd: {
    ...listElementEnd,
    textAlign: "center",
  },
  listElementIcon: {
    ...listElement,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  listElementIconHeader: {
    ...listElement,
    width: 40,
    textAlign: "center",
  },
  listElementStart: {
    ...listElementStart,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Modal CSS classes ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  bottomSheet: {
    ...appShadows,
    borderRadius: 20,
  },
  bottomSheetContent: {
    ...appShadows,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    padding: 36,
    paddingTop: 0, 
  },
  bottomSheetPositioning: {
    marginLeft: 75,
    marginRight: 75,

    ...Platform.select({
      ios: {
        marginTop: 580,
      },
      default: {
        marginTop: 610,
      },    
    }),
  },
  bottomSheetPositioningCategory: {
    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 300,
      },
      default: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 320,
      },    
    }),
  },
  bottomSheetPositioningExpense: {
    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 310,
      },
      default: {
        marginLeft: 20,
        arginRight: 20,
        marginTop: 330,
      },    
    }),
  },
  bottomSheetPositioningTransaction: {
    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 170,
      },
      default: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 190,
      },    
    }),
  },
  bottomSheetPositioningTransactionEdit: {
    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 140,
      },
      default: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 160,
      },    
    }),
  },
  modal: { 
    ...modal,
  },
  modalPositioning: {
    flex: 1,
    marginBottom: 100,
    justifyContent: "flex-end",
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
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  inputHeaderText: {
    marginLeft: 10,
  },
  modalHeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallText: {
    fontSize: 12,
  },
  subHeaderText: {
    fontSize: 20,
    paddingLeft: 5,
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
});