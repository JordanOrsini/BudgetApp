import {Image} from "react-native";
import {styles} from "./Style";

const CategoryIconManager = (iconPath, large = false) => {
  switch (iconPath) {
    case "carIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/carIcon.png")}
               alt="CAR" />
      );
    }
    case "entertainmentIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/entertainmentIcon.png")}
               alt="ENTERTAINMENT" />
      );
    }
    case "groceriesIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/groceriesIcon.png")}
               alt="GROCERIES" />
      );
    }
    case "homeIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/homeIcon.png")}
               alt="HOME" />
      );
    }
    case "noneIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/noneIcon.png")}
               alt="NONE" />
      );
    }
    case "restaurantIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/restaurantIcon.png")}
               alt="RESTAURANT" />
      );
    }
    case "schoolIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/schoolIcon.png")}
               alt="SCHOOL" />
      );
    }
    case "workIcon.png": {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/workIcon.png")}
               alt="WORK" />
      );
    }
    default: {
      return (
        <Image style={large ? styles.iconLarge : styles.icon}
               source={require("./icons/noneIcon.png")}
               alt="NONE" />
      );
    }         
  }
}

export default CategoryIconManager;