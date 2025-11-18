/* 
   Class representing an Expense object.
*/
class Expense {
  #name = null;
  #amount = null;
  #interval = null;
  #startDate = null;

  constructor ({name, amount, interval, startDate}) {
    this.#name = name;
    this.#amount = amount;
    this.#interval = interval;
    this.#startDate = startDate 
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