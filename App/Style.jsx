import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    alignItems: 'center',
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  transactionElement: {
    flexDirection: 'row',
  },
  transactionRemove: {
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});