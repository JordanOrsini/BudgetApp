import {StyleSheet} from 'react-native';

/* 
   Style sheets CSS for the entire application.
*/
export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    flex: 1,  
    justifyContent: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  mainBodyText: {
    flex: 1,
  },
  modal: {
    margin: 20,
    backgroundColor: 'silver',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 10,
  },
  modalAccept: {
    borderRadius: 20,
    backgroundColor: '#A0FAA0',
    paddingLeft: 5,
    paddingRight: 5,
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
  navigation: {
    flexDirection: 'row',
    padding: 20,
  },
  pageView: {
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    borderRadius: 20,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    padding: '10',
  },
  transactionElement: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 25,
  },
  transactionRemove: {
    borderRadius: 20,
    backgroundColor: '#F76464',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 20,
    width: '100%',
  },
});