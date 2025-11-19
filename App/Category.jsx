/* 
   Class representing a category object.
*/
class Category {
  #name = null;
  #iconPath = null;

  constructor ({name, iconPath}) {
    this.#name = name;
    this.#iconPath = iconPath;
  }

  getName () {
    return this.#name;
  }

  setName (newName) {
    this.#name = newName;
  }

  getIconPath () {
    return this.#iconPath;
  }

  setIconPath (newIconPath) {
    this.#iconPath = newIconPath;
  }

  toString() {
    return this.#name + ";" + this.#iconPath;
  }
}

export default Category;