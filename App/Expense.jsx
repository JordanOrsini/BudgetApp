/* 
   Class representing an Expense object.
*/
class Transaction {
  #name = null;
  #amount = null;
  #recurring = null;

  constructor (props) {
    this.#name = props.name;
    this.#amount = props.amount;
    this.#recurring = props.recurring; 
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