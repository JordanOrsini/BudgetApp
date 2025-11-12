/* 
   Class representing a transaction object.
*/
class Category {
  #name = null;
  #iconPath = null;

  constructor (props) {
    this.#name = props.name;
    this.#iconPath = props.iconPath;
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
    return this.#name + ';' + this.#iconPath;
  }
}

export default Category;