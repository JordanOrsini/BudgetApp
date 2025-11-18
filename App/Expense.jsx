/* 
   Class representing an expense object.
*/
class Expense {
  static id = 0;

  #id = null;
  #name = null;
  #amount = null;
  #interval = null;
  #startDate = null;

  constructor ({name, amount, interval, startDate}) {
    this.#id = Expense.id;
    Expense.id++;

    this.#name = name;
    this.#amount = amount;
    this.#interval = interval;
    this.#startDate = startDate 
  }

  getId () {
    return this.#id;
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

  getStartDate () {
    return this.#startDate;
  }

  setStartDate (newStartDate) {
    this.#startDate = newStartDate;
  }

  toString() {
    return this.#name + ';' + this.#amount + ';' + this.#interval + ';' + this.#startDate;
  }
}

export default Expense;