import {Platform, StyleSheet} from "react-native";

// Style sheets CSS for the entire application.
export const styles = StyleSheet.create({
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Button CSS classes ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  button: {
    backgroundColor: "#FFFFFF",
    width: 80,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
  categoryButtons: {
    borderRadius: 50,
    height: 80,
  },
  smallButton: {
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
    backgroundColor: "#E1E1E1",
    padding: 10,
    marginTop: 10,
    width: 380,
    borderRadius: 30,
    height: 320,
  },
  mainBodyContainerLarge: {
    flex: 1,
  },
  mainBodyContainerMicro: {  
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
    width: 325,
    borderRadius: 20,
  },
  expenseListElement: {
    width: 105,
  },
  expenseListTitleEnd: {
    width: 150,
  },
  lastItem: {
    ...Platform.select({
      ios: {
        paddingBottom: 75,
      },
      default: {
        paddingBottom: 100,
      },    
    }),
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  listElement: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    height: 40,
    backgroundColor: "#FFFFFF",
    width: 80,
  },
  listElementEnd: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  listElementStart: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  listElementTitle: {
    width: 360,
    borderRadius: 20,
  },
  recentExpenseListElement: {
    width: 120,
  },
  recentTransactionListElement: {
    width: 90,
  },
  transactionListTitleEnd: {
    width: 120,
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Modal classes ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  modal: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuModal: {
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
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: 40,
  },
  navButtonLeft: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginLeft: 10,
  },
  navButtonMiddle: {
    borderRadius: 50,
    height: 80,
    marginLeft: 5,
    marginRight: 5,
  },
  navButtonMiddleLeft: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  navButtonMiddleRight: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  navButtonRight: {
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
  // Text classes /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  creationText: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
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
  textInputDate: {
    width: 260,
    backgroundColor: "#E1E1E1",
  },
});