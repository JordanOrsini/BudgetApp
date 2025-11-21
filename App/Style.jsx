import {Platform, StyleSheet} from "react-native";

/* 
   Style sheets CSS for the entire application.
*/
export const styles = StyleSheet.create({
  accept: {
    backgroundColor: "#A0FAA0",
  },
  addCategoryModal: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  addTransactionModal: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  categoryButtons: {
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    elevation: 5,
    margin: 10,
  },
  categoryContainer: {
    height: 200,
    width: 300,
  },
  categoryElement: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    height: 40,
    width: 325,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  creationText: {
    paddingBottom: 10,
  },
  decline: {
    backgroundColor: "#F76464",
  },
  edit: {
    backgroundColor: "#FFB343",
  },
  expenseElement: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 105,
    height: 40,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  hide: {
    opacity: 0,
  },
  intervalContainer: {
    height: 125,
    width: 300,
  },
  mainBodyContainerMicro: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    marginTop: 10,
    width: 380,
    height: 160,
    borderRadius: 30,
  },
  flatListSmall: {
    height: 320,
  },
  mainBodyContainerSmall: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    marginTop: 10,
    width: 380,
    height: 320,
    borderRadius: 30,
  },
  mainBodyContainerLarge: {
    backgroundColor: "#E1E1E1",
    padding: 10,
    marginTop: 10,
    width: 380,
    flex: 1,
    borderRadius: 30,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  modalMenuContent: {
    alignItems: "center",
    paddingTop: 10,
  },
  modalMenuModal: {
    margin: 75,
    marginBottom: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalPositioning: {
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 100,
  },
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
  modalNavContainer: {
    position: "absolute",
    width: "100%",
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
  pageView: {
    alignItems: "center",
    flex: 1,
  },
  selected: {
    backgroundColor: "#ADD8E6",
  },
  standardButton: {
    backgroundColor: "#FFFFFF",
    width: 80,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
  pressed: {
    backgroundColor: "#FDFD96",
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
  transactionContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
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
  smallButton: {
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  transactionElement: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 80,
    height: 40,
    backgroundColor: "#FFFFFF",
  },
  transactionElementLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  transactionElementRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});