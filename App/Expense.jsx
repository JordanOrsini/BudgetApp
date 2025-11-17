/* 
   Class representing an Expense object.
*/
class Transaction {
  #name = null;
  #amount = null;
  #recurring = null;

  constructor ({name, amount, recurring}) {
    this.#name = name;
    this.#amount = amount;
    this.#recurring = recurring; 
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

  getRecurring () {
    return this.#recurring;
  }

  setRecurring (newRecurring) {
    this.#recurring = newRecurring;
  }

  toString() {
    return this.#name + ';' + this.#amount + ';' + this.#recurring;
  }
}

export default Expense;