const CategoryChoiceConverter = (choiceInteger) => {
  switch (choiceInteger) {
    case 1:
      return "Restaurant";
    case 2:
      return "Gas";
    case 3:
      return "Entertainment";
    case 4:
      return "Transportation";
    case 5:
      return "Car";
    case 6:
      return "Home";
    case 7:
      return "Clothing";
    case 8:
      return "Pets";
    case 0:
    default: 
      return "N/A";
  }
}

export default CategoryChoiceConverter;