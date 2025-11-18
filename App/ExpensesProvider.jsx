import Expense from './Expense';
import ExpensesContext from './ExpensesContext';

const ExpensesProvider = ({children}) => {

  // Values to expose in our context.
  const contextValue = {
  }

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesProvider;