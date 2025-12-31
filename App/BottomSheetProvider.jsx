import {useRef, useState} from "react";
import {View, useWindowDimensions} from "react-native";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from "./Style";

import MenuBottomSheet from "./MenuBottomSheet";
import AddExpenseBottomSheet from "./AddExpenseBottomSheet";
import AddCategoryBottomSheet from "./AddCategoryBottomSheet";
import AddTransactionBottomSheet from "./AddTransactionBottomSheet";

import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContext from "./BottomSheetContext";

const BottomSheetProvider = ({children}) => {
  const [content, setContent] = useState("Menu");
  const [editObject, setEditObject] = useState(null);
  const [transferContent, setTransferContent] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const bottomSheetRef = useRef(null);
  const windowHeight = useWindowDimensions().height;

  const BottomSheetBackdrop = () => {
    return (
      bottomSheetVisible &&
      <View style={[styles.bottomSheetBackdrop, {height: windowHeight}]} />
    );
  }

  const BottomSheetMain = () => {
    return (
      <BottomSheet style={getStyle()}
                   backgroundStyle={[styles.bottomSheet, editObject ? styles.edit : {borderWidth: 0}]}
                   ref={bottomSheetRef}
                   onChange={handleSheetChanges}
                   detached={true}
                   index={-1}
                   enablePanDownToClose={true}
                   overDragResistanceFactor={9}
                   bottomInset={getInset()}
                   backdropComponent={BottomSheetBackdrop}>     
        <BottomSheetView>
          {getContent()}
        </BottomSheetView>
      </BottomSheet>
    );
  }

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

  const getInset = () => {
    switch (content) {
      case "Menu": {
        return 300;
      }
      case "Expense": {
        return 600;
      }
      case "Transaction": {
        return 800;
      }
      case "Category": {
        return 600;
      }
    }
  }

  const getStyle = () => {
    switch (content) {
      case "Menu": {
        return styles.bottomSheetPositioning;
      }
      case "Expense": {
        return styles.bottomSheetPositioningExpense;
      }
      case "Transaction": {
        if (editObject)
          return styles.bottomSheetPositioningTransactionEdit;
        
        return styles.bottomSheetPositioningTransaction;
      }
      case "Category": {
        return styles.bottomSheetPositioningCategory;
      }
    }
  }

  const handleSheetChanges = (index) => {
    console.log("Bottom sheet index: " + index);

    if (index === -1)
      setBottomSheetVisible(false);
    else
      setBottomSheetVisible(true);
  }

  const _setContent = (newContent, newEditObject, newTransferContent) => {
    setContent(newContent);

    if (newEditObject)
      setEditObject(newEditObject);
    else
      setEditObject(null);

    if (newTransferContent)
      setTransferContent(newTransferContent);
    else
      setTransferContent(null);

    bottomSheetRef.current?.expand();
  }
    
  // Values to expose in our context.
  const contextValue = {
    bottomSheetRef,
    bottomSheetVisible,
    _setContent,

    BottomSheetBackdrop,
    BottomSheetMain,
  }

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export default BottomSheetProvider;