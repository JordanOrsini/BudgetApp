/* 
   Class representing a transaction object.
*/
class Transaction {
  #name = null;
  #amount = null;
  #category = null;
  #transactionDate = null;
  #creationDate = null;

  constructor ({name, amount, category, transactionDate, creationDate}) {
    this.#name = name;
    this.#amount = amount;
    this.#category = category;
    this.#transactionDate = transactionDate;
    this.#creationDate = creationDate; 
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