import {useEffect, useState} from "react";
import {Keyboard} from "react-native";

import KeyboardListenerContext from "./KeyboardListenerContext";

const KeyboardListenerProvider = ({children}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {setKeyboardVisible(true);}
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {setKeyboardVisible(false);}
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

   // Values to expose in our context.
  const contextValue = {
    isKeyboardVisible
  }

  return (
    <KeyboardListenerContext.Provider value={contextValue}>
      {children}
    </KeyboardListenerContext.Provider>
  );
}

export default KeyboardListenerProvider;