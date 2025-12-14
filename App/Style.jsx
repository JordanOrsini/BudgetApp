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
const background = {
  backgroundColor: "#FFFFFF",
};
const border = {
  borderWidth: 2,
  borderColor: "#ECECEC",
};
const button = {
  ...appShadows,
  ...background,
  width: 90,
  height: 45,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
  margin: 4,
};
const listElement = {
  ...appShadows,
  ...background,
  paddingLeft: 6,
  paddingRight: 6,
  lineHeight: 40,
  width: 105,
};
const listElementEnd = {
  ...listElement,
  marginRight: 5,
  paddingRight: 12,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
};
const listElementStart = {
  ...listElement,
  marginLeft: 5,
  paddingLeft: 12,
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
};
const mainBodyContainer = {
  ...background,
  padding: 10,
  borderRadius: 20,
  width: "100%",
  height: "auto",
};
const navButton = {
  ...appShadows,
  ...background,
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  height: 40,
};
const textInput = {
  ...appShadows,
  ...background,
  borderRadius: 20,
  width: 295,
  height: 40,
  marginTop: 5,
  marginBottom: 5,
  paddingLeft: 12,
  paddingRight: 12,
};

// Style sheets CSS for the entire application.
export const styles = StyleSheet.create({
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Bottom sheet CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  bottomSheet: {
    ...appShadows,
    borderRadius: 20,
  },
  bottomSheetBackdrop: {
    height: 900,
  },
  bottomSheetContent: {
    ...appShadows,
    ...background,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    padding: 36,
    paddingTop: 10, 
  },
  bottomSheetPositioning: {
    marginLeft: 75,
    marginRight: 75,

    ...Platform.select({
      ios: {
        marginTop: 580,
      },
      default: {
        marginTop: 605,
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
        marginTop: 302,
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
        marginRight: 20,
        marginTop: 310,
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
        marginTop: 145,
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
        marginTop: 115,
      },    
    }),
  },
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
    width: 350,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Colour CSS classes ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  accept: {
    ...border,
    borderColor: "#A0FAA0",
  },
  background: {
    ...background,
  },
  border: {
    ...border,
  },
  decline: {
     ...border,
    borderColor: "#F76464",
  },
  edit: {
     ...border,
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
  blurPosition: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: 90,
    ...Platform.select({
      ios: {
        marginTop: 770,
      },
      default: {
        marginTop: 810,
      },    
    }),
  },
  bottomSheetNavContainer: {
    position: "absolute",
    width: "100%",
  },
  categoryContainer: {
    height: 195,
    alignItems: "center",
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10, 
  },
  intervalContainer: {
    height: 110,
    alignItems: "center",
  },
  lastContainer: {
    ...Platform.select({
      ios: {
        marginBottom: 60,
      },
      default: {
        marginBottom: 70,
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
        height: 675,
      },
      default: {
        height: 725,
      },    
    }),
  },
  mainBodyContainerSmall: {
    ...mainBodyContainer, 
    height: 285,
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
    marginLeft: 235,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconLarge: {
    height: 36,
    width: 36,
  },
  iconGiant: {
    height: 225,
    width: 225,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // List element CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  categoryListElementEnd: {
    ...listElementEnd,
    width: 175,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryListElementEndHeader: {
    ...listElementEnd,
    width: 175,
    textAlign: "center",
  },
  categoryListElementStart: {
    ...listElementStart,
    width: 175,
  },
  expenseListElementEnd:{
    ...listElementEnd,
    width: 140,
    textAlign: "center",
  },
  lastItem: {
    ...Platform.select({
      ios: {
        paddingBottom: 45,
      },
      default: {
        paddingBottom: 80,
      },    
    }),
  },
  listElement: {
    ...listElement,
  },
  listElementEnd: {
    ...listElementEnd,
    width: 100,
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
  topCategoryListElementEndIcon: {
    ...listElementEnd,
    width: 140,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  topCategoryListElementEndText: {
    ...listElementEnd,
    width: 140,
    textAlign: "center",
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
    zIndex: -1,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    ...Platform.select({
      ios: {
        marginTop: 750,
      },
      default: {
        marginTop: 790,
      },    
    }),
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Text CSS classes /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  bottomSheetHeaderText: {
    fontSize: 25,
    fontWeight: "bold",
  },
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
    margin: 5,
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
    justifyContent: "center",
  },
});