/* 
   Class representing a transaction object.
*/
class Transaction {
  #name = null;
  #amount = null;
  #category = null;
  #transactionDate = null;
  #creationDate = null;

  constructor (props) {
    this.#name = props.name;
    this.#amount = props.amount;
    this.#category = props.category;
    this.#transactionDate = props.transactionDate;
    this.#creationDate = props.creationDate; 
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

  getCategory () {
    return this.#category;
  }

  setCategory (newCategory) {
    this.#category = newCategory;
  }

  getTransactionDate () {
    return this.#transactionDate;
  }

  setTransactionDate (newTransactionDate) {
    this.#transactionDate = newTransactionDate;
  }

  getCreationDate () {
    return this.#creationDate;
  }

  setCreationDate (newCreationDate) {
    this.#creationDate = newCreationDate;
  }

  toString() {
    return this.#name + ';' + this.#amount + ';' + this.#category + ';' + this.#transactionDate + ';' + this.#creationDate;
  }
}

export default Transaction;