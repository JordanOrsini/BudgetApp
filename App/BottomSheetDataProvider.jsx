import {useState} from "react";
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import MenuBottomSheet from "./MenuBottomSheet";
import AddExpenseBottomSheet from "./AddExpenseBottomSheet";
import AddCategoryBottomSheet from "./AddCategoryBottomSheet";
import AddTransactionBottomSheet from "./AddTransactionBottomSheet";

import BottomSheetDataContext from "./BottomSheetDataContext";

const BottomSheetDataProvider = ({children}) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [content, setContent] = useState("Menu");
  const [editObject, setEditObject] = useState(null);
  const [transferContent, setTransferContent] = useState(null);

  const getContent = () => {
    switch (content) {
      case "Menu": {
        return (
          <MenuBottomSheet />
        );
      }
      case "Expense": {
        return (
          <AddExpenseBottomSheet expenseToEdit={editObject} />
        );
      }
      case "Transaction": {
        return (
          <AddTransactionBottomSheet transactionToEdit={editObject}
                                     transferContent={transferContent} />
        );
      }
      case "Category": {
        return (
          <AddCategoryBottomSheet categoryToEdit={editObject}
                                  transferContent={transferContent} />
        );
      }
    }
  }

  const getStyle = () => {
    switch (content) {
      case "Menu": {
        return (
          styles.bottomSheetPositioning
        );
      }
      case "Expense": {
        return (
          styles.bottomSheetPositioningExpense
        );
      }
      case "Transaction": {
        if (editObject)
          return (
            styles.bottomSheetPositioningTransactionEdit
          );
        
        return (
          styles.bottomSheetPositioningTransaction
        );
      }
      case "Category": {
        return (
          styles.bottomSheetPositioningCategory
        );
      }
    }
  }

  const _setContent = (newContent, newEditObject, newTransferContent) => {
    setBottomSheetVisible(true);
    setContent(newContent);

    if (newEditObject)
      setEditObject(newEditObject);
    else
      setEditObject(null);

    if (newTransferContent)
      setTransferContent(newTransferContent);
    else
      setTransferContent(null);
  }
    
  // Values to expose in our context.
  const contextValue = {
    bottomSheetVisible,
    setBottomSheetVisible,
    _setContent,
    
    getContent,
    getStyle,
    editObject,
  }

  return (
    <BottomSheetDataContext.Provider value={contextValue}>
      {children}
    </BottomSheetDataContext.Provider>
  );
}

export default BottomSheetDataProvider;