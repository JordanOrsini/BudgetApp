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
    paddingTop: 25,
  },
  mainBodyText: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
  },
  pageView: {
    alignItems: 'center',
    flex: 1,
  },
  transactionElement: {
    flexDirection: 'row',
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
});