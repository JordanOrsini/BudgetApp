import {Image} from "react-native";
import {styles} from "./Style";

export const getIconFromPath = (iconPath) => {
  switch (iconPath) {
    case "bmoLogo.png": {
      return (
        <Image style={styles.iconLogo}
               source={require("./icons/logos/bmoLogo.png")}
               alt="BMO" />
      );
    }
    case "nationalBankLogo.png": {
      return (
        <Image style={styles.iconLogo}
               source={require("./icons/logos/nationalBankLogo.png")}
               alt="National bank" />
      );
    }
    case "scotiaBankLogo.png": {
      return (
        <Image style={styles.iconLogo}
               source={require("./icons/logos/scotiaBankLogo.png")}
               alt="Scotia bank" />
      );
    }
    case "tdBankLogo.png": {
      return (
        <Image style={styles.iconLogo}
               source={require("./icons/logos/tdBankLogo.png")}
               alt="TD bank" />
      );
    }
    case "questradeLogo.png": {
      return (
        <Image style={styles.iconLogo}
               source={require("./icons/logos/questradeLogo.png")}
               alt="Questrade" />
      );
    }
    case "wealthsimpleLogo.png": {
      return (
        <Image style={styles.iconLogo}
               source={require("./icons/logos/wealthsimpleLogo.png")}
               alt="Wealthsimple" />
      );
    }
    default: {
      return (
        <Image style={styles.iconLarge}
               source={require("./icons/categoryIcons/noneIcon.png")}
               alt="NONE" />
      );
    }         
  }
}
