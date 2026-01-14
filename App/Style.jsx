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
const backgroundTransparent = {
  backgroundColor: "rgba(255, 255, 255, 0.925)",
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
  ...backgroundTransparent,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 20,
  height: "auto",
  width: "100%",
};
const navButton = {
  ...appShadows,
  ...background,
  alignItems: "center",
  justifyContent: "center",
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
  // Accordion CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  accordionHeader: {
    ...border,
    borderRadius: 20,
    paddingLeft: 10,
    margin: 10,
    height: 75,
    justifyContent: "center",
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Bottom sheet CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  bottomSheet: {
    ...appShadows,
    height: 40,
  },
  bottomSheetBackdrop: {
    width: "100%",
    backgroundColor: "black",
    opacity: 0.25,
    position: "absolute",
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
        marginTop: 570,
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
        marginTop: 270,
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
        marginTop: 280,
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
        marginTop: 115,
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
        marginTop: 90,
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
    marginTop: 15,
    marginBottom: 15,
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
   backgroundTransparent: {
    ...backgroundTransparent,
  },
  border: {
    ...border,
    marginTop: 2.5,
    marginBottom: 2.5,
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
    backgroundColor: "#FAFAFA",
  },
  selected: {
    backgroundColor: "#ADD8E6",
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Container CSS classes ////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  bottomSheetNavContainer: {
    position: "absolute",
    width: "100%",
  },
  categoryContainer: {
    height: 195,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10, 
  },
  intervalContainer: {
    height: 110,
    alignItems: "center",
  },
  lastContainer: {
    marginBottom: 110,
  },
  mainBodyContainer: { 
    ...mainBodyContainer, 
  },
  mainBodyContainerSmall: {
    ...mainBodyContainer, 
    height: 295,
  },
  pageView: {
    flex: 1,
    alignItems: "center",
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
  iconFull: {
    height: 225,
    width: "100%",
  },
  iconGiant: {
    height: 225,
    width: 225,
  },
  iconLarge: {
    height: 36,
    width: 36,
  },
  iconLogo: {
    height: 70,
    width: 140,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // List element CSS classes /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  accountListElementStart: {
    width: 140,
    height: 40,
    alignItems: "center", 
    justifyContent: "center",
  },
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
  expenseListElementEnd: {
    ...listElementEnd,
    width: 140,
    textAlign: "center",
  },
  goalListElementEnd: {
    ...listElementEnd,
    width: 175,
    textAlign: "center",
  },
  goalListElementStart: {
    ...listElementStart,
    width: 175,
  },
  incomeListElementEnd: {
    ...listElementEnd,
    textAlign: "center",
    width: 120,
  },
  incomeListElementStart: {
    ...listElementStart,
    width: 120,
  },
  lastItem: {
    paddingBottom: 110,
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
    flex: 1,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginLeft: 10,
  },
  navButtonMiddle: {
    ...navButton,
    borderRadius: 50,
    height: 80,
    width: 80,
    marginLeft: 5,
    marginRight: 5,
  },
  navButtonMiddleLeft: {
    ...navButton,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  navButtonMiddleRight: {
    ...navButton,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  navButtonRight: {
    ...navButton,
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: 10,
  },
  navigationBackground: {
    ...backgroundTransparent,
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
  containerHeaderText: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 5,
  },
  creationText: {
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  goalsOverlay: {
    position: "absolute",
    backgroundColor: "#88E788",
    height: 40,
  },
  goalsText: {
    zIndex: 1,
    textAlign: "center",
    lineHeight: 40,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        paddingTop: 60,
      },
      default: {
        paddingTop: 40,
      },    
    }),
  },
  inputHeaderText: {
    marginLeft: 10,
    margin: 5,
  },
  searchInput: {
    ...textInput,
    width: 355,
    position: "absolute",
    opacity: 0.925,

    ...Platform.select({
      ios: {
        marginTop: 693,
      },
      default: {
        marginTop: 735,
      },    
    }),
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