import {useContext} from "react";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from "./Style";

import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetDataContext from "./BottomSheetDataContext";

const BottomSheetMain = () => {
  const bottomSheetDataContext = useContext(BottomSheetDataContext);

  const handleSheetChanges = (index) => {
    if (index === -1)
      bottomSheetDataContext.setBottomSheetVisible(false);
  }

  return ( 
    <BottomSheet style={bottomSheetDataContext.getStyle()}
                 backgroundStyle={[styles.bottomSheet, bottomSheetDataContext.editObject ? styles.edit : {borderWidth: 0}]}
                 onChange={handleSheetChanges}
                 detached={true}
                 enablePanDownToClose={true}
                 overDragResistanceFactor={2}>     
      <BottomSheetView>
        {bottomSheetDataContext.getContent()}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default BottomSheetMain;