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
    backgroundColor: '#FFB343',
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
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    height: 200,
  },
  decline: {
    backgroundColor: '#F76464',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  mainBodyText: {
    flex: 1,
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
  modalNavContainer: {
    width: '100%',
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
  navigationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
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
  transactionElement: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 25,
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
  scrollView: {
    flex: 1,
    paddingLeft: 20,
    width: '100%',
  },
});