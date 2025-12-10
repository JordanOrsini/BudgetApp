import {useState} from "react";
import {Pressable, Text, View} from "react-native";
import {styles} from "./Style";

import AddExpenseModal from "./AddExpenseModal";
import AddCategoryModal from "./AddCategoryModal";
import AddTransactionModal from "./AddTransactionModal";
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
          <View style={styles.bottomSheetContent}>
            <Text style={styles.modalHeaderText}>Add new...?</Text>
            <View style={styles.horizontalContainer}>
              <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                         onPress={() => setContent("Expense")}>
                <Text>Expense</Text>
              </Pressable>
              <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
                         onPress={() => setContent("Transaction")}>
                <Text>Transaction</Text>
              </Pressable>
            </View>
          </View>
        );
      }
      case "Expense": {
        return (
          <AddExpenseModal expenseToEdit={editObject} />
        );
      }
      case "Transaction": {
        return (
          <AddTransactionModal transactionToEdit={editObject}
                               transferContent={transferContent} />
        );
      }
      case "Category": {
        return (
          <AddCategoryModal categoryToEdit={editObject}
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