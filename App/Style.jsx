import {StyleSheet} from 'react-native';

/* 
   Style sheets CSS for the entire application.
*/
export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 10,
  },
  modalClose: {
    borderRadius: 20,
    borderWidth: 1,
    width: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  modalPositioning: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 75,
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
  transactionElement: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 25,
  },
  transactionRemove: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 20,
    width: '100%',
  },
});