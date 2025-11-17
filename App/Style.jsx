import {StyleSheet} from 'react-native';

/* 
   Style sheets CSS for the entire application.
*/
export const styles = StyleSheet.create({
  accept: {
    backgroundColor: '#A0FAA0',
  },
  addCategoryModal: {
    margin: 20,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  addTransactionModal: {
    margin: 20,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  categoryButtons: {
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    margin: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    height: 200,
  },
  categoryElement: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    height: 40,
    width: 290,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  decline: {
    backgroundColor: '#F76464',
  },
  edit: {
    backgroundColor: '#FFB343',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  mainBodyContainer: {
    backgroundColor: '#E1E1E1',
    flex: 1,
    padding: 10,
    marginTop: 10,
    width: 380,
    borderRadius: 30,
  },
  modalButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2.5,
    marginRight: 2.5,
    elevation: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
  },
  modalPositioning: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 100,
  },
  navButton: {
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
    position: 'absolute',
    width:'100%',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 775,
    position: 'absolute',
    paddingBottom: 40,
  },
  pageView: {
    alignItems: 'center',
    flex: 1,
  },
  selected: {
    backgroundColor: '#ADD8E6',
  },
  pressed: {
    backgroundColor: '#FDFD96',
  },
  textInput: {
    borderRadius: 20,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: '10',
    elevation: 5,
  },
  transactionContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  lastItem: {
    paddingBottom: 100,
  },
  transactionElement: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 70,
    height: 40,
    backgroundColor: '#FFFFFF',
  },
  transactionElementLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  transactionElementRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  transactionRemove: {
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
});