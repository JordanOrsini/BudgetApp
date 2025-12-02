/* 
   Class representing a Category object.
*/
class Category {
  #name = null;
  #iconPath = null;

  constructor(name = "NONE", iconPath = "noneIcon.png") {
    this.#name = name;
    this.#iconPath = iconPath;
  }

  // iconPath
  getIconPath() {
    return this.#iconPath;
  }

  setIconPath(newIconPath) {
    this.#iconPath = newIconPath;
  }

  // name
  getName() {
    return this.#name;
  }
  
  setName(newName) {
    this.#name = newName;
  }


  // For exporting Transaction objects.
  toString() {
    return this.#name;
  }

  // For exporting Category objects.
  toStringCategory() {
    return this.#name + ";" + this.#iconPath;
  }
}

export default Category;