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
    <Pressable style={({pressed}) => [style, isSelected ? styles.selected : '', pressed ? styles.pressed : '']} onPress={() => onPressHandler()}>
      {children}
    </Pressable>
  );
}

export default SelectableButton;