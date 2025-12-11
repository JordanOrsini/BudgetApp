import {useState} from "react";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from "./Style";

import MenuBottomSheet from "./MenuBottomSheet";
import AddExpenseBottomSheet from "./AddExpenseBottomSheet";
import AddCategoryBottomSheet from "./AddCategoryBottomSheet";
import AddTransactionBottomSheet from "./AddTransactionBottomSheet";

import BottomSheet from "@gorhom/bottom-sheet";
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

  const handleSheetChanges = (index) => {
    if (index === -1)
      setBottomSheetVisible(false);
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

  const BottomSheetMain = () => {
    if (!bottomSheetVisible)
      return (null);

    return (
      <BottomSheet style={getStyle()}
                   backgroundStyle={[styles.bottomSheet, editObject ? styles.edit : {borderWidth: 0}]}
                   onChange={handleSheetChanges}
                   detached={true}
                   enablePanDownToClose={true}
                   overDragResistanceFactor={2}>     
        <BottomSheetView>
          {getContent()}
        </BottomSheetView>
      </BottomSheet>
    );
  }
    
  // Values to expose in our context.
  const contextValue = {
    setBottomSheetVisible,
    _setContent,
    BottomSheetMain,
  }

  return (
    <BottomSheetDataContext.Provider value={contextValue}>
      {children}
    </BottomSheetDataContext.Provider>
  );
}

export default BottomSheetDataProvider;