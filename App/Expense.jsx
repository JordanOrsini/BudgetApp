/* 
   Class representing an Expense object.
*/
class Expense {
  #name = null;
  #amount = null;
  #interval = null;

  constructor ({name, amount, interval}) {
    this.#name = name;
    this.#amount = amount;
    this.#interval = interval; 
  }

  getName () {
    return this.#name;
  }

  setName (newName) {
    this.#name = newName;
  }

  getAmount () {
    return this.#amount;
  }

  setAmount (newAmount) {
    this.#amount = newAmount;
  }

  getInterval () {
    return this.#interval;
  }

  setInterval (newInterval) {
    this.#interval = newInterval;
  }

  toString() {
    return this.#name + ';' + this.#amount + ';' + this.#interval;
  }
}

export default Expense;