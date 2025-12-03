import {Image} from "react-native";
import {styles} from "./Style";

export const getIconFromPath = (iconPath, large = false) => {
  switch (iconPath) {
    case "carIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/carIcon.png")}
               alt="CAR" />
      );
    }
    case "entertainmentIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/entertainmentIcon.png")}
               alt="ENTERTAINMENT" />
      );
    }
    case "groceriesIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/groceriesIcon.png")}
               alt="GROCERIES" />
      );
    }
    case "homeIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/homeIcon.png")}
               alt="HOME" />
      );
    }
    case "noneIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/noneIcon.png")}
               alt="NONE" />
      );
    }
    case "restaurantIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/restaurantIcon.png")}
               alt="RESTAURANT" />
      );
    }
    case "schoolIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/schoolIcon.png")}
               alt="SCHOOL" />
      );
    }
    case "workIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/workIcon.png")}
               alt="WORK" />
      );
    }
    default: {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/categoryIcons/noneIcon.png")}
               alt="NONE" />
      );
    }         
  }
}

export const getAllIconPaths = () => {
  return (
    ["noneIcon.png", 
     "carIcon.png", 
     "entertainmentIcon.png", 
     "groceriesIcon.png", 
     "homeIcon.png",
     "restaurantIcon.png", 
     "schoolIcon.png",
     "workIcon.png"]
  );   
}