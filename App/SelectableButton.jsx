import {useState} from 'react';
import {Pressable} from "react-native";
import {styles} from "./Style";

const SelectableButton = ({children, style, selected = false, onPress}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const onPressHandler = () => {
    setIsSelected(true);

    if (onPress) {
      onPress();
    }
  }

  return (
    <Pressable style={({pressed}) => [style, pressed ? styles.pressed : isSelected ? styles.selected : styles.unSelected]} onPress={() => onPressHandler()}>
      {children}
    </Pressable>
  );
}

export default SelectableButton;