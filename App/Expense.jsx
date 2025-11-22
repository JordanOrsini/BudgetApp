/* 
   Class representing an Expense object.
*/
class Expense {
  static id = 0;

  #id = null;
  #name = null;
  #amount = null;
  #interval = null;

  constructor ({name, amount, interval}) {
    this.#id = Expense.id;
    Expense.id++;

    this.#name = name;
    this.#amount = amount;
    this.#interval = interval;
  }

  // amount
  getAmount () {
    return this.#amount;
  }

  setAmount (newAmount) {
    this.#amount = newAmount;
  }

  // id
  getId () {
    return this.#id;
  }

  // interval
  getInterval () {
    return this.#interval;
  }

  setInterval (newInterval) {
    this.#interval = newInterval;
  }

  // name
  getName () {
    return this.#name;
  }

  setName (newName) {
    this.#name = newName;
  }

  // For exporting Expense objects.
  toString() {
    return this.#name + ";" + this.#amount + ";" + this.#interval;
  }
}

export default Expense;